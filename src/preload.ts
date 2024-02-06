// See the Electron documentation for details on how to use preload scripts:

import { IpcRendererEvent } from 'electron';

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronApi', {
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  onDisplayImage: (displayImageCallback: (event: IpcRendererEvent, imagePath: string) => void) => ipcRenderer.on('display-image', displayImageCallback)
});

export { };

declare global {

  interface Window {
    electronApi: {
      selectDirectory: () => void,
      onDisplayImage: (displayImageCallback: (event: IpcRendererEvent, imagePath: string) => void) => void
    }
  }
}
