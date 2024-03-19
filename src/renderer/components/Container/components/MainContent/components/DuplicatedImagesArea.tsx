import { useContext } from 'react';
import { DuplicatedImagesContext } from '../../../contexts';
import { ImageCard } from './ImageCard';

export const DuplicatedImagesArea = () => {

  const { imagesProperties } = useContext(DuplicatedImagesContext);

  return [...imagesProperties.entries()].map(([checksum, imageProperties]) =>
    <ImageCard
      key={checksum}
      imageProperties={imageProperties} />
  );
};
