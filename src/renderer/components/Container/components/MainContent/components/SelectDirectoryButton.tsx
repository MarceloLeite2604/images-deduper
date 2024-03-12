import { Button } from '@mui/material';
import { MouseEventHandler } from 'react';

const selectDirectory: MouseEventHandler = () => {
  window.electronApi.selectDirectory();
};

export const SelectDirectoryButton = () => {

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
