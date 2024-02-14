import Grid from '@mui/material/Unstable_Grid2';
import { MainContent, StatusBar } from './components';
import { StatusContext } from './contexts';
import { useStatusBarProperties } from './hooks';

export const Container = () => {

  const [statusBarProperties] = useStatusBarProperties({ message: 'test', progress: 75 });

  return (
    <StatusContext.Provider value={statusBarProperties}>
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
        <Grid>
          <StatusBar />
        </Grid>
      </Grid >
    </StatusContext.Provider>
  );
};
