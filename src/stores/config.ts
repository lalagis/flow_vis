import { FlowmapLayer } from '@flowmap.gl/layers'
import { proxy } from 'valtio'

export const configStore = proxy({
  opacity: 1.0,
  darkMode: true,
  colorScheme: 'SunsetDark',
  fadeAmount: FlowmapLayer.defaultProps.fadeAmount,
  fadeEnabled: FlowmapLayer.defaultProps.fadeEnabled,
  fadeOpacityEnabled: FlowmapLayer.defaultProps.fadeOpacityEnabled,
  locationsEnabled: FlowmapLayer.defaultProps.locationsEnabled,
  locationsTotalsEnabled: FlowmapLayer.defaultProps.locationTotalsEnabled,
  locationsLabelsEnabled: FlowmapLayer.defaultProps.locationLabelsEnabled,
  animationEnabled: FlowmapLayer.defaultProps.animationEnabled,
  clusteringEnabled: FlowmapLayer.defaultProps.clusteringEnabled,
  clusteringAuto: FlowmapLayer.defaultProps.clusteringAuto,
  clusteringLevel: FlowmapLayer.defaultProps.clusteringLevel,
  adaptiveScalesEnabled: FlowmapLayer.defaultProps.adaptiveScalesEnabled,
  highlightColor: FlowmapLayer.defaultProps.highlightColor,
  maxTopFlowsDisplayNum: FlowmapLayer.defaultProps.maxTopFlowsDisplayNum,
})
