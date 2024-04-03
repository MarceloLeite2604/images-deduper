// import { FC, createContext, useCallback, useEffect, useMemo, useState } from 'react';
// import { ReactNodeChildren } from '../types';
// import { ImageProperties } from '../../../../shared/types';
// import { RendererContext } from '../../../../shared/types/ContextProperties';

// interface RendererContextProperties {
//   context: RendererContext,
//   updateContext: (context: Partial<RendererContext>) => void
// }

// // interface DuplicatedImagesContextProperties {
// //   rootDirectory?: string,
// //   setRootDirectory: (rootDirectory?: string) => void,
// //   imagesProperties: Map<string, ImageProperties>,
// //   addImage: (imageProperties: ImageProperties) => void,
// //   selectedImageChecksum?: string,
// //   setSelectedImageChecksum: (hash?: string) => void
// // }

// // export const DuplicatedImagesContext = createContext<DuplicatedImagesContextProperties>({
// //   rootDirectory: undefined,
// //   setRootDirectory: () => { },
// //   imagesProperties: new Map<string, ImageProperties>(),
// //   addImage: () => { },
// //   selectedImageChecksum: undefined,
// //   setSelectedImageChecksum: () => { }
// // });

// export const RendererContext = createContext<RendererContextProperties>({
//   context: {} as undefined as RendererContext
// });

// export const DuplicatedImagesContextProvider: FC<ReactNodeChildren> = ({ children }) => {

//   const [rootDirectory, setRootDirectory] = useState<string>();

//   const [imagesProperties, setImagesProperties] = useState(new Map<string, ImageProperties>());

//   const [selectedImageChecksum, setSelectedImageChecksum] = useState<string>();

//   const addImage = useCallback((imagesProperties: ImageProperties) => {
//     setImagesProperties(previous => {
//       const imagePropertiesToUpdate = previous.get(imagesProperties.checksum) || imagesProperties;

//       const newLocations = imagesProperties.locations.filter(location => !imagePropertiesToUpdate.locations.includes(location));
//       imagePropertiesToUpdate.locations.push(...newLocations);

//       // TODO Is there a cleaner way to update this state?
//       return new Map(previous.set(imagePropertiesToUpdate.checksum, imagesProperties));
//     });
//   }, [setImagesProperties]);

//   useEffect(() => {
//     window.electronApi.addImage((imagesProperties) => {
//       addImage(imagesProperties);
//     });

//     window.electronApi.setRootDirectory((rootDirectory) => {
//       setRootDirectory(rootDirectory);
//     });
//   }, []);

//   const value = useMemo<DuplicatedImagesContextProperties>(() => {
//     return {
//       rootDirectory,
//       setRootDirectory,
//       imagesProperties,
//       addImage,
//       selectedImageChecksum,
//       setSelectedImageChecksum
//     };
//   }, [
//     imagesProperties,
//     setImagesProperties,
//     rootDirectory,
//     setRootDirectory,
//     selectedImageChecksum,
//     setSelectedImageChecksum
//   ]);

//   return (
//     <DuplicatedImagesContext.Provider value={value} >
//       {children}
//     </DuplicatedImagesContext.Provider>
//   );
// };