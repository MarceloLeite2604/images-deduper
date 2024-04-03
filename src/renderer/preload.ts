// See the Electron documentation for details on how to use preload scripts:

import {
  ImageProperties,
  StatusProperties,
  AddImageCallback,
  UpdateStatusCallback,
  SetRootDirectoryCallback,
  ipcEvents,
} from '../shared';
import { contextBridge, ipcRenderer } from 'electron/renderer';

type ElectronApiWithCallbackFunction<P, C extends (properties: P) => void> = (callback: C) => void;

type ElectronApiWithoutCallbackFunction = () => void;

type UpdateStatusApiFunction = ElectronApiWithCallbackFunction<StatusProperties, UpdateStatusCallback>;

type AddImageApiFunction = ElectronApiWithCallbackFunction<ImageProperties, AddImageCallback>;

type SetRootDirectoryApiFunction = ElectronApiWithCallbackFunction<string, SetRootDirectoryCallback>;

interface ElectronApi {
  selectDirectory: ElectronApiWithoutCallbackFunction,
  updateStatus: UpdateStatusApiFunction,
  addImage: AddImageApiFunction,
  setRootDirectory: SetRootDirectoryApiFunction,
}

const api: ElectronApi = {
  selectDirectory: () => {
    ipcRenderer.invoke(ipcEvents.selectDirectory)
      .catch(console.log);
  },
  updateStatus: (callback) =>
    ipcRenderer.on(ipcEvents.updateStatus, (event, properties) => {
      callback(properties as StatusProperties);
    }),
  addImage: (callback) =>
    ipcRenderer.on(ipcEvents.addImage, (event, imageProperties) => {
      callback(imageProperties as ImageProperties);
    }),
  setRootDirectory: (callback) =>
    ipcRenderer.on(ipcEvents.setRootDirectory, (event, rootDirectory) => {
      callback(rootDirectory as string)
    })
}

contextBridge.exposeInMainWorld('electronApi', api);

declare global {

  interface Window {
    electronApi: ElectronApi
  }
};
