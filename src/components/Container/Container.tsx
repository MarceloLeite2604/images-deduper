import Grid from '@mui/material/Unstable_Grid2';
import {
  MainContent,
  StatusBar,
  StatusBarProps
} from './components';
import { useState } from 'react';

export const Container = () => {

  useState<StatusBarProps>({});

  return <Grid container
    direction='column'
    justifyContent='flex-start'
    alignItems='stretch'
    spacing={0}
    sx={{
      minHeight: '100vh'
    }}>
    <Grid xs
      display='flex'
      justifyContent='center'
      alignItems='center'>
      <MainContent />
    </Grid>
    <Grid>
      <StatusBar
        message='Example message'
        progress={75} />
    </Grid>
  </Grid >;
};
