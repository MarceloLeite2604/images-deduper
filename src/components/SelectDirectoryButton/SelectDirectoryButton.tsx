import { Button } from '@mui/material';
import { MouseEventHandler } from 'react';

const selectDirectory: MouseEventHandler = () => {
  window.electronApi.selectDirectory();
};

export const SelectDirectoryButton = () =>
  <Button
    variant='contained'
    onClick={selectDirectory}>
    Select directory
  </Button>;
