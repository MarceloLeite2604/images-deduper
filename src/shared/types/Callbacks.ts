import {
  ImageProperties,
  StatusProperties
} from './Context';

export type AddImageCallback = (imageProperties: ImageProperties) => void;

export type UpdateStatusCallback = (statusProperties: StatusProperties) => void;

export type SetRootDirectoryCallback = (rootDirectory: string) => void;