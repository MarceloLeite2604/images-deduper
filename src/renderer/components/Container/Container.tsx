import Grid from '@mui/material/Unstable_Grid2';
import { MainContent, StatusBar } from './components';
import { ContextProviders } from './contexts';

export const Container = () => {

  return (
    <ContextProviders>
      <Grid container
        direction='column'
        justifyContent='flex-start'
        alignItems='stretch'
        spacing={0}
        flex={1}>
        <Grid xs display='flex'>
          <MainContent />
        </Grid>
        <Grid>
          <StatusBar />
        </Grid>
      </Grid >
    </ContextProviders>
  );
};
