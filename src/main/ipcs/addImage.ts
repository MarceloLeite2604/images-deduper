import { ImageProperties } from '../../shared/types';

type AddImageMethodType = (imageProperties: ImageProperties) => void;

let addImageMethod: AddImageMethodType;

export const addImage = (imageProperties: ImageProperties) => {
  if (!addImageMethod) {
    console.warn('Add image method is not ready yet.');
  }
  addImageMethod(imageProperties);
};

export const initAddImageMethod = (addImageMethodCallback: AddImageMethodType) => {
  if (!addImageMethod) {
    addImageMethod = addImageMethodCallback;
  }
};
