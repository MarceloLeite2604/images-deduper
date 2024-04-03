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

  const addImage = useCallback((imagesProperties: ImageProperties) => {
    setContext(previous => {
      const { relativePaths: incomingRelativePaths } = imagesProperties;
      const previousImageProperties = previous.duplicatedImages.get(imagesProperties.checksum) || imagesProperties;
      const { relativePaths: previousRelativePaths } = previousImageProperties;

      const newRelativePaths = incomingRelativePaths.filter(incomingRelativePath => !previousRelativePaths.includes(incomingRelativePath));
      previousImageProperties.relativePaths.push(...newRelativePaths);

      const duplicatedImages = new Map(previous.duplicatedImages.set(previousImageProperties.checksum, previousImageProperties));

      return {
        ...previous,
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
    console.log('Context:');
    console.log(context)
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