import { useContext } from 'react';
import { RendererContext } from '../../../contexts';
import { ImageCard } from './ImageCard';

export const DuplicatedImagesArea = () => {

  const { context: { duplicatedImages } } = useContext(RendererContext);

  return [...duplicatedImages.entries()].map(([checksum, imageProperties]) =>
    <ImageCard
      key={checksum}
      imageProperties={imageProperties} />
  );
};
