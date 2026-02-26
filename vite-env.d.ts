/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
  // añade aquí tus otras variables
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}