import { Grid } from '@mui/material';
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
    <Grid item xs>
      <Grid container
        direction='column'
        alignItems='center'
        justifyContent='center'
        spacing={0}
        sx={{
          height: '100%'
        }}>
        <Grid item>
          <MainContent />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={1} >
      <StatusBar
        message='Example message'
        progress={75} />
    </Grid>
  </Grid >;
