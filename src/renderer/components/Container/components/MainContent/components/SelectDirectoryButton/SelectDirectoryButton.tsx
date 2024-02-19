import { Button } from '@mui/material';
import { IpcRendererEvent } from 'electron';
import { MouseEventHandler, useEffect } from 'react';

function displayImageCallback(_event: IpcRendererEvent, imagePath: string) {
  console.log(imagePath);
}

const selectDirectory: MouseEventHandler = () => {
  window.electronApi.selectDirectory();
};

export const SelectDirectoryButton = () => {

  useEffect(() => {
    console.log('Setting display image');
    window.electronApi.displayImage(displayImageCallback);
  }, []);

  return (
    < Button
      variant='contained'
      onClick={selectDirectory}
      sx={{
        margin: '5px 0px'
      }}>
      Select directory
    </Button >
  );
};
