import { useState } from 'react';
import { StatusBarProps } from '../components';

const useStatus = () => {
  const [_, setStatusBarProps] = useState<StatusBarProps>({});

  const setMessage = (message: string) => {
    setStatusBarProps(previous => {
      return {
        ...previous,
        message
      };
    });
  };

  const setProgress = (progress: number) => {
    setStatusBarProps(previous => {
      return {
        ...previous,
        progress
      };
    });
  };
}