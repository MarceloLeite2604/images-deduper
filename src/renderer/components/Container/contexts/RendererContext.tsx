import {
  FC,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { ReactNodeChildren } from '../types';
import {
  ImageProperties,
  RendererContext as RendererContextType,
  StatusProperties
} from '../../../../shared/types';

interface RendererContextProperties {
  context: RendererContextType,
  updateContext: (context: Partial<RendererContextType>) => void
}

export const RendererContext = createContext<RendererContextProperties>({
  context: {} as RendererContextType,
  updateContext: () => { }
});

export const RendererContextProvider: FC<ReactNodeChildren> = ({ children }) => {

  const [context, setContext] = useState<RendererContextType>({
    duplicatedImages: new Map<string, ImageProperties>(),
    status: {
      progress: 0
    }
  } as RendererContextType);

  const addImage = useCallback((incomingImageProperties: ImageProperties) => {
    setContext(previousContext => {
      const { relativePaths: incomingRelativePaths } = incomingImageProperties;
      const previousImageProperties = previousContext.duplicatedImages.get(incomingImageProperties.checksum);
      const previousRelativePaths = (previousImageProperties?.relativePaths || []);

      const previousPaths = previousRelativePaths.map(imagePath => imagePath.path);

      const newRelativePaths = incomingImageProperties.relativePaths.filter(
        incomingRelativePath => !previousPaths.includes(incomingRelativePath.path));

      const mergedRelativePaths = [...previousRelativePaths, ...newRelativePaths];

      const mergedImageProperties = (previousImageProperties || incomingImageProperties);
      mergedImageProperties.relativePaths = mergedRelativePaths;

      const duplicatedImages = new Map(previousContext.duplicatedImages.set(incomingImageProperties.checksum, mergedImageProperties));

      return {
        ...previousContext,
        duplicatedImages
      };
    });
  }, [setContext]);

  const updateStatus = useCallback((status: StatusProperties) => {
    setContext(previousContext => ({
      ...previousContext,
      status
    }))
  }, [setContext]);

  const setRootDirectory = useCallback((rootDirectory: string) => {
    setContext(previousContext => ({
      ...previousContext,
      rootDirectory
    }))
  }, [setContext]);

  const updateContext = useCallback((context: Partial<RendererContextType>) => {

    setContext(previousContext => ({
      ...previousContext,
      ...context
    }))
  }, [setContext]);

  useEffect(() => {
    window.electronApi.addImage((imagesProperties) => {
      addImage(imagesProperties);
    });

    window.electronApi.updateStatus((statusProperties) => {
      updateStatus(statusProperties);
    });

    window.electronApi.setRootDirectory((rootDirectory) => {
      setRootDirectory(rootDirectory);
    });
  }, []);

  const value = useMemo<RendererContextProperties>(() => ({
    context,
    updateContext
  })
    , [
      context,
      updateContext
    ]);

  return (
    <RendererContext.Provider value={value} >
      {children}
    </RendererContext.Provider>
  );
};