import {
  FC,
  createContext,
  useCallback,
  useMemo,
  useState
} from 'react';
import {
  ReactNodeChildren,
  StatusBarContext,
  StatusBarProperties
} from '../types';

export const StatusContext = createContext<StatusBarContext>({
  properties: {},
  updateProperties: () => { }
});

export const StatusContextProvider: FC<ReactNodeChildren> = ({ children }) => {

  const [statusBarProperties, setStatusBarProperties] = useState<StatusBarProperties>({
    progress: 50,
    message: 'This is a test message.'
  });

  const updateProperties = useCallback((properties: StatusBarProperties) => {
    setStatusBarProperties(previous => {
      return {
        ...previous,
        ...properties
      };
    });
  }, [setStatusBarProperties]);

  const value = useMemo<StatusBarContext>(() => {
    return {
      properties: statusBarProperties,
      updateProperties
    };
  }, [statusBarProperties, setStatusBarProperties]);

  return (
    <StatusContext.Provider value={value}>
      {children}
    </StatusContext.Provider>
  );
};
