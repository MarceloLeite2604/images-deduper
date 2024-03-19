import { BrowserWindow, dialog } from 'electron';
import { processImages } from '../image';
import { setRootDirectory } from './setRootDirectory';

export function createSelectDirectoryIpc(mainWindow: BrowserWindow) {
  return () => {
    dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory']
    })
      .then(openDialogReturnValue => {
        setRootDirectory(openDialogReturnValue?.filePaths[0]);
        return openDialogReturnValue;
      })
      .then(processImages)
      .catch(console.error);
  }
}