import { SetRootDirectoryCallback } from '../../shared';

let setRootDirectoryMethod: SetRootDirectoryCallback;

export const setRootDirectory = (rootDirectory?: string) => {
  if (!setRootDirectoryMethod) {
    console.warn('Set root directory method is not ready yet.');
  }
  setRootDirectoryMethod(rootDirectory);
};

export const initSetRootDirectoryMethod = (setRootDirectoryMethodCallback: SetRootDirectoryCallback) => {
  if (!setRootDirectoryMethod) {
    setRootDirectoryMethod = setRootDirectoryMethodCallback;
  }
};