interface IpcEvents {
  selectDirectory: string,
  updateStatus: string,
  addImage: string,
  onImageLoaded: string,
  setRootDirectory: string
};

export const ipcEvents: IpcEvents = {
  selectDirectory: 'select-directory',
  updateStatus: 'update-status',
  addImage: 'add-image',
  onImageLoaded: 'on-image-loaded',
  setRootDirectory: 'set-root-directory'
};