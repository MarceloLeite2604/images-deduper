import { Grid } from '@mui/material';
import { SelectDirectoryButton } from './components';

export const App = () =>

  <Grid container
    alignItems='center'
    justifyContent='center'>
    <Grid item xs={4}>
      <SelectDirectoryButton />
    </Grid>
  </Grid>;
