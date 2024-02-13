import Grid from '@mui/material/Unstable_Grid2';
import { MainContent, StatusBar } from './components';

export const Container = () =>
  <Grid container
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
    <Grid maxHeight='1.2rem'>
      <StatusBar
        message='Example message'
        progress={75} />
    </Grid>
  </Grid >;
