import { IpcMainInvokeEvent, nativeImage } from 'electron';
import { ipcEvents } from '../../shared/events';

export function loadImage(event: IpcMainInvokeEvent, path: string) {
  const image = nativeImage.createFromPath(path);
  event.sender.send(ipcEvents.onImageLoaded, path, image);
}