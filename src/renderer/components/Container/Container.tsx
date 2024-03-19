import Grid from '@mui/material/Unstable_Grid2';
import { MainContent, StatusBar } from './components';
import { ContextProviders } from './contexts';

export const Container = () => {

  return (
    <ContextProviders>
      <Grid
        id="container-grid-container"
        container
        direction='column'
        justifyContent='flex-start'
        alignItems='stretch'
        spacing={0}
        flex={1}>
        <Grid
          id="main-content-container-grid-item"
          xs
          display='flex'>
          <MainContent />
        </Grid>
        <Grid id="status-bar-container-grid-item">
          <StatusBar />
        </Grid>
      </Grid >
    </ContextProviders >
  );
};
