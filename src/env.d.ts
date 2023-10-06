/// <reference types="astro/client" />
/// <reference types="vitest" />

interface ImportMetaEnv {
  readonly PUBLIC_MAPBOX_ACCESS_TOKEN: string
  readonly PUBLIC_MAPBOX_STYLE_LIGHT: string
  readonly PUBLIC_MAPBOX_STYLE_DARK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface LocationDatum {
  id: string
  lat: number
  lon: number
  name: string
}

interface FlowDatum {
  origin: string
  dest: string
  count: number
}
