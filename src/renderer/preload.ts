// See the Electron documentation for details on how to use preload scripts:

import {
  AddImageCallback,
  StatusBarProperties,
  UpdateStatusCallback,
  ImageProperties,
  SetRootDirectoryCallback,
  ipcEvents
} from '../shared';
import { contextBridge, ipcRenderer } from 'electron/renderer';

contextBridge.exposeInMainWorld('electronApi', {
  selectDirectory: () => ipcRenderer.invoke(ipcEvents.selectDirectory),
  updateStatus: (updateStatusCallback: UpdateStatusCallback) => ipcRenderer.on(ipcEvents.updateStatus, (event, properties) => {
    updateStatusCallback(properties as StatusBarProperties);
  }),
  addImage: (addImageCallback: AddImageCallback) => ipcRenderer.on(ipcEvents.addImage, (event, imageProperties) => {
    addImageCallback(imageProperties as ImageProperties);
  }),
  setRootDirectory: (setRootDirectoryCallback: SetRootDirectoryCallback) => ipcRenderer.on(ipcEvents.setRootDirectory, (event, rootDirectory) => {
    setRootDirectoryCallback(rootDirectory as string)
  })
});

declare global {

  interface Window {
    electronApi: {
      selectDirectory: () => void,
      updateStatus: (updateStatusCallback: UpdateStatusCallback) => void
      addImage: (addImageCallback: AddImageCallback) => void,
      setRootDirectory: (setRootDirectoryCallback: SetRootDirectoryCallback) => void
    }
  }
};
