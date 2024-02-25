// See the Electron documentation for details on how to use preload scripts:

import { NativeImage } from 'electron';
import {
  AddImageCallback,
  StatusBarProperties,
  UpdateStatusCallback,
  OnImageLoadedCallback,
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
  }),
  loadImage: (path: string) => ipcRenderer.send(ipcEvents.loadImage, path),
  onImageLoaded: (onImageLoadedCallback: OnImageLoadedCallback) => ipcRenderer.on(ipcEvents.onImageLoaded, (event, nativeImage) => {
    onImageLoadedCallback(nativeImage as NativeImage);
  })
});

declare global {

  interface Window {
    electronApi: {
      selectDirectory: () => void,
      updateStatus: (updateStatusCallback: UpdateStatusCallback) => void
      addImage: (addImageCallback: AddImageCallback) => void
      loadImage: (path: string) => void
      onImageLoaded: (onImageLoadedCallback: OnImageLoadedCallback) => void
    }
  }
};
