// import {
//   FC,
//   createContext,
//   useCallback,
//   useEffect,
//   useMemo,
//   useState
// } from 'react';
// import { ReactNodeChildren, StatusBarContext } from '../types';
// import { StatusBarProperties } from '../../../../shared/types';

// export const StatusContext = createContext<StatusBarContext>({
//   properties: {},
//   updateProperties: () => { }
// });

// export const StatusContextProvider: FC<ReactNodeChildren> = ({ children }) => {

//   const [statusBarProperties, setStatusBarProperties] = useState<StatusBarProperties>({
//     progress: 50,
//     message: 'This is a test message.'
//   });

//   const updateProperties = useCallback((properties: StatusBarProperties) => {
//     setStatusBarProperties(previous => {
//       return {
//         ...previous,
//         ...properties
//       };
//     });
//   }, [setStatusBarProperties]);

//   useEffect(() => {
//     window.electronApi.updateStatus((properties) => {
//       updateProperties(properties);
//     });
//   }, []);

//   const value = useMemo<StatusBarContext>(() => {
//     return {
//       properties: statusBarProperties,
//       updateProperties
//     };
//   }, [statusBarProperties, setStatusBarProperties]);

//   return (
//     <StatusContext.Provider value={value}>
//       {children}
//     </StatusContext.Provider>
//   );
// };
