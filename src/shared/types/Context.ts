export interface StatusProperties {
  message?: string,
  progress: number
};

export interface ImagePath {
  path: string,
  excluded: boolean,
  selected: boolean
};

export interface ImageProperties {
  relativePaths: ImagePath[],
  checksum: string
};

export interface MainContext {
  rootDirectory?: string,
  images: Map<string, ImageProperties>
};

export interface RendererContext {
  rootDirectory?: string,
  selectedImage?: ImageProperties,
  duplicatedImages: Map<string, ImageProperties>
  status: StatusProperties
};