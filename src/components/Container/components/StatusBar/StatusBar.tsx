import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ThickLinearProgress } from './components';
import { StatusContext } from '../../contexts';
import { useContext } from 'react';

export const StatusBar = () => {

  const { message, progress } = useContext(StatusContext);

  const progressBar = progress && <ThickLinearProgress value={progress || 0} />;

  return (
    <Grid
      container
      spacing={0}
      justifyContent='flex-start'
      alignItems='flex-end'>
      < Grid xs={3} >
        {progressBar}
      </Grid >
      <Grid
        xs
        display='flex'
        justifyContent='flex-start'
        alignItems='center'>
        <Typography
          variant="caption"
          display="block">
          {message}
        </Typography>
      </Grid>
    </Grid >
  );
};
