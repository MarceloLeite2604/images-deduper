import { Button } from '@mui/material';
import { IpcRendererEvent } from 'electron';
import { MouseEventHandler, useEffect } from 'react';

function displayImage(_event: IpcRendererEvent, imagePath: string) {
  console.log(imagePath);
}

const selectDirectory: MouseEventHandler = () => {
  window.electronApi.selectDirectory();
};

export const SelectDirectoryButton = () => {

  useEffect(() => {
    window.electronApi.onDisplayImage(displayImage);
  }, []);

  return (
    < Button
      variant='contained'
      onClick={selectDirectory} >
      Select directory
    </Button >
  );
};
