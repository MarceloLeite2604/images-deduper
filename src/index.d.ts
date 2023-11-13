export namespace ImageDeduper {
  export type Versions = {
    node: () => string,
    chrome: () => string,
    electron: () => string
  }
}

declare global {
  const _versions : ImageDeduper.Versions
  interface Window {
    versions: ImageDeduper.Versions
  }
}