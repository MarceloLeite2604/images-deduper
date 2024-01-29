// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronApi', {
  selectDirectory: () => ipcRenderer.send('select-directory')
});

export { };

declare global {

  interface Window {
    electronApi: {
      selectDirectory: () => void
    }
  }
}
