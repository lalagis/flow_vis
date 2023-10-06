import type { FlowmapData } from '@flowmap.gl/data'
import { csv } from 'd3-fetch'

const base = 'https://gist.githubusercontent.com/ilyabo/'
const path = `${base}/68d3dba61d86164b940ffe60e9d36931/raw/a72938b5d51b6df9fa7bba9aa1fb7df00cd0f06a`

let cachedData: FlowmapData<LocationDatum, FlowDatum> | undefined = undefined

export const useFetchData = () => {
  return async () => {
    if (!cachedData) {
      cachedData = await Promise.all([
        csv(`${path}/locations.csv`, (row) => ({
          id: row.id,
          name: row.name,
          lat: Number(row.lat),
          lon: Number(row.lon),
        })),
        csv(`${path}/flows.csv`, (row) => ({
          origin: row.origin,
          dest: row.dest,
          count: Number(row.count),
        })),
      ]).then(([locations, flows]) => ({ locations, flows }))
    }
    return cachedData
  }
}
