// See the Electron documentation for details on how to use preload scripts:

import { IpcRendererEvent } from 'electron';
import { StatusBarProperties } from '../shared/types';

const { contextBridge, ipcRenderer } = require('electron/renderer');

type DisplayImageCallBack = (event: IpcRendererEvent, imagePath: string) => void;

type UpdateStatusCallBack = (event: IpcRendererEvent, properties: StatusBarProperties) => void;

contextBridge.exposeInMainWorld('electronApi', {
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  displayImage: (displayImageCallback: DisplayImageCallBack) => ipcRenderer.on('display-image', displayImageCallback),
  updateStatus: (updateStatusCallback: UpdateStatusCallBack) => ipcRenderer.on('update-status', (event, properties) => {
    updateStatusCallback(event, properties);
  })
});

declare global {

  interface Window {
    electronApi: {
      selectDirectory: () => void,
      displayImage: (displayImageCallback: (event: IpcRendererEvent, imagePath: string) => void) => void
      updateStatus: (updateStatusCallback: (event: IpcRendererEvent, properties: StatusBarProperties) => void) => void
    }
  }
};
