import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ThickLinearProgress } from './components';
import { StatusContext } from '../../contexts';
import { useContext } from 'react';

export const StatusBar = () => {

  const { properties: { progress, message } } = useContext(StatusContext);

  const progressBar = progress ? <ThickLinearProgress value={progress} /> : <></>;

  return (
    <Grid container>
      <Grid xs={3}>
        {progressBar}
      </Grid >
      <Grid
        xs
        display='flex'
        justifyContent='flex-start'
        alignItems='center'>
        <Typography
          variant='caption'
          lineHeight='0.8rem'>
          {message}
        </Typography>
      </Grid>
    </Grid >
  );
};
