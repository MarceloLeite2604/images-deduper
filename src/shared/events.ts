interface IpcEvents {
  selectDirectory: string,
  updateStatus: string,
  addImage: string,
  onImageLoaded: string
};

export const ipcEvents: IpcEvents = {
  selectDirectory: 'select-directory',
  updateStatus: 'update-status',
  addImage: 'add-image',
  onImageLoaded: 'on-image-loaded'
};