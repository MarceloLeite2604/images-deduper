import { createContext } from 'react';

interface DisplayImagesContext {
  images: string[],
  addImage: (imagePath: string) => void
}

export const StatusContext = createContext<DisplayImagesContext>({
  images: [],
  addImage: () => { }
});
