import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { MouseEventHandler, useContext } from 'react';
import { DuplicatedImagesContext } from '../../../contexts';

const selectDirectory: MouseEventHandler = () => {
  window.electronApi.selectDirectory();
};

export const SelectDirectoryButton = () => {

  const { rootDirectory } = useContext(DuplicatedImagesContext);

  return (
    <Grid
      container
      display='flex'
      justifyContent='flex-start'
      alignContent='center'
      alignItems='center'
      flexDirection='row'
      flexGrow={1}>

      <Button
        variant='contained'
        onClick={selectDirectory}
        sx={{
          margin: '5px',
        }}>
        Select directory
      </Button >
      <Grid flexGrow={1}>
        {rootDirectory && <Typography>{rootDirectory}</Typography>}
      </Grid>

    </Grid>
  );
};
