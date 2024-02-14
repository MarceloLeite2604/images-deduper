import { createContext } from 'react';
import { StatusBarProperties } from '../types';

export const StatusContext = createContext<StatusBarProperties>({});
