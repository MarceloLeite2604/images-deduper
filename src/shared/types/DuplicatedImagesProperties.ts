import { NativeImage } from 'electron';

export interface ImageProperties {
  checksum: string,
  locations: string[],
  nativeImage: NativeImage
}

export type AddImageCallback = (imageProperties: ImageProperties) => void;