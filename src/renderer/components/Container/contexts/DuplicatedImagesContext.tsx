import { FC, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { ReactNodeChildren } from '../types';
import { ImageProperties } from '../../../../shared/types';

interface DuplicatedImagesContextProperties {
  imagesProperties: Map<string, ImageProperties>,
  addImage: (imageProperties: ImageProperties) => void
}

export const DuplicatedImagesContext = createContext<DuplicatedImagesContextProperties>({
  imagesProperties: new Map<string, ImageProperties>(),
  addImage: () => { }
});

export const DuplicatedImagesContextProvider: FC<ReactNodeChildren> = ({ children }) => {

  const [imagesProperties, setImagesProperties] = useState(new Map<string, ImageProperties>());

  const addImage = useCallback((imagesProperties: ImageProperties) => {
    setImagesProperties(previous => {
      const imagePropertiesToUpdate = previous.get(imagesProperties.checksum) || imagesProperties;

      const newLocations = imagesProperties.locations.filter(location => !imagePropertiesToUpdate.locations.includes(location));
      imagePropertiesToUpdate.locations.push(...newLocations);

      // TODO Is there a cleaner way to update this state?
      return new Map(previous.set(imagePropertiesToUpdate.checksum, imagesProperties));
    });
  }, [setImagesProperties]);

  useEffect(() => {
    window.electronApi.addImage((imagesProperties) => {
      addImage(imagesProperties);
    });
  }, []);

  const value = useMemo<DuplicatedImagesContextProperties>(() => {
    return {
      imagesProperties,
      addImage
    };
  }, [imagesProperties, setImagesProperties]);

  return (
    <DuplicatedImagesContext.Provider value={value} >
      {children}
    </DuplicatedImagesContext.Provider>
  );
};