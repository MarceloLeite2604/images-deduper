interface IpcEvents {
  selectDirectory: string,
  updateStatus: string,
  addImage: string,
  loadImage: string,
  onImageLoaded: string
};

export const ipcEvents: IpcEvents = {
  selectDirectory: 'select-directory',
  updateStatus: 'update-status',
  addImage: 'add-image',
  loadImage: 'loadImage',
  onImageLoaded: 'on-image-loaded'
};