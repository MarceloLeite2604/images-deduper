import Grid from '@mui/material/Unstable_Grid2';
import { DuplicatedImagesArea, SelectDirectoryButton } from './components';

export const MainContent = () => {
  return (
    <Grid
      container
      direction='column'
      display='flex'
      justifyContent='flex-start'
      alignContent='stretch'
      flexGrow={1}>
      <Grid
        display='flex'
        justifyContent='center'
        alignItems='center'>
        <SelectDirectoryButton />
      </Grid>
      <Grid xs>
        <DuplicatedImagesArea />
      </Grid>
    </Grid >
  );
};
