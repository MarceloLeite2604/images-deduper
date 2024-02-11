import { Grid, LinearProgress } from '@mui/material';

interface StatusBarProps {
  message: string,
  progress?: number
}

export const StatusBar = ({ message, progress }: StatusBarProps) =>
  <Grid container
    spacing={0}
    direction='row'
    justifyContent='flex-start'
    alignItems='flex-end'>
    <Grid item xs={10}>
      {progress}
    </Grid>
    <Grid item xs={2}>
      {message}
    </Grid>
  </Grid>;
