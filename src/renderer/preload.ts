// See the Electron documentation for details on how to use preload scripts:

import {
  AddImageCallback,
  StatusBarProperties,
  UpdateStatusCallback,
  ImageProperties
} from '../shared/types';
import { contextBridge, ipcRenderer } from 'electron/renderer';
import { ipcEvents } from '../shared/events';

contextBridge.exposeInMainWorld('electronApi', {
  selectDirectory: () => ipcRenderer.invoke(ipcEvents.selectDirectory),
  updateStatus: (updateStatusCallback: UpdateStatusCallback) => ipcRenderer.on(ipcEvents.updateStatus, (event, properties) => {
    updateStatusCallback(properties as StatusBarProperties);
  }),
  addImage: (addImageCallback: AddImageCallback) => ipcRenderer.on(ipcEvents.addImage, (event, imageProperties) => {
    addImageCallback(imageProperties as ImageProperties);
  })
});

declare global {

  interface Window {
    electronApi: {
      selectDirectory: () => void,
      updateStatus: (updateStatusCallback: UpdateStatusCallback) => void
      addImage: (addImageCallback: AddImageCallback) => void
    }
  }
};
