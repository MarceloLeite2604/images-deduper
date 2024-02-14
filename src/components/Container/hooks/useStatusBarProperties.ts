import { useState } from 'react';
import { StatusBarProperties } from '../types';

export const useStatusBarProperties = (initialValue: StatusBarProperties = {}) => {
  const [properties, setProperties] = useState<StatusBarProperties>(initialValue);

  const setStatusBarProperties = (props: StatusBarProperties) => {
    setProperties(previous => {
      return {
        ...previous,
        ...props
      };
    });
  };

  return [properties, setStatusBarProperties] as const;
};
