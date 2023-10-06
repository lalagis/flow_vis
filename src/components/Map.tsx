import 'mapbox-gl/dist/mapbox-gl.css'

import { DeckGL } from '@deck.gl/react/typed'
import { type FlowmapData, getViewStateForLocations } from '@flowmap.gl/data'
import { FlowmapLayer } from '@flowmap.gl/layers'
import { useEffect, useState } from 'react'
import { Map as MapGL, type ViewState } from 'react-map-gl'
import { useSnapshot } from 'valtio'

import { useFetchData } from '../hooks/useFetchData'
import { configStore, envStore } from '../stores/config'

export default function Map() {
  const [viewState, setViewState] = useState<ViewState>()
  const [data, setData] = useState<FlowmapData<LocationDatum, FlowDatum>>()

  const fetchData = useFetchData()
  useEffect(() => {
    ;(async () => {
      setData(await fetchData())
    })()
  }, [])

  useEffect(() => {
    if (!viewState && data?.locations) {
      const [width, height] = [globalThis.innerWidth, globalThis.innerHeight]
      const viewState = getViewStateForLocations(data.locations, (loc) => [loc.lon, loc.lat], [width, height])
      setViewState({
        ...viewState,
        latitude: viewState.latitude - 0.02,
        zoom: viewState.zoom,
        // @ts-expect-error
        width,
        height,
      })
    }
  }, [data])
  const handleViewStateChange = ({ viewState }: any) => {
    setViewState(viewState)
  }
  const env = useSnapshot(envStore)
  const config = useSnapshot(configStore)
  const layers = []
  if (data) {
    layers.push(
      new FlowmapLayer<LocationDatum, FlowDatum>({
        id: 'flowmap-layer',
        data,
        opacity: config.opacity,
        pickable: true,
        darkMode: config.darkMode,
        colorScheme: config.colorScheme,
        fadeAmount: config.fadeAmount,
        fadeEnabled: config.fadeEnabled,
        fadeOpacityEnabled: config.fadeOpacityEnabled,
        locationsEnabled: config.locationsEnabled,
        locationTotalsEnabled: config.locationsTotalsEnabled,
        locationLabelsEnabled: config.locationsLabelsEnabled,
        animationEnabled: config.animationEnabled,
        clusteringEnabled: config.clusteringEnabled,
        clusteringAuto: config.clusteringAuto,
        clusteringLevel: config.clusteringLevel,
        adaptiveScalesEnabled: config.adaptiveScalesEnabled,
        highlightColor: config.highlightColor,
        maxTopFlowsDisplayNum: config.maxTopFlowsDisplayNum,
        getLocationId: (loc: LocationDatum) => loc.id,
        getLocationLat: (loc: LocationDatum) => loc.lat,
        getLocationLon: (loc: LocationDatum) => loc.lon,
        getFlowOriginId: (flow: any) => flow.origin,
        getLocationName: (loc: any) => loc.name,
        getFlowDestId: (flow: any) => flow.dest,
        getFlowMagnitude: (flow: any) => flow.count,
        onHover: (info) => {},
        onClick: (info) => {
          console.log('clicked', info.object, info)
        },
      }),
    )
  }
  if (!viewState) return null

  return (
    <div className="relative h-screen w-screen">
      <DeckGL
        width="100%"
        height="100%"
        initialViewState={viewState}
        onViewStateChange={handleViewStateChange}
        controller
        // @ts-expect-error
        layers={layers}
        style={{ mixBlendMode: config.darkMode ? 'screen' : 'darken' }}
      >
        <MapGL
          mapboxAccessToken={env.MAPBOX_ACCESS_TOKEN}
          mapStyle={config.darkMode ? env.MAPBOX_STYLE_DARK : env.MAPBOX_STYLE_LIGHT}
        />
      </DeckGL>
    </div>
  )
}
