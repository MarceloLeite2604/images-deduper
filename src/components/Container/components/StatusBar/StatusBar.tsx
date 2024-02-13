import { Typography, styled } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import LinearProgress from '@mui/material/LinearProgress';

export interface StatusBarProps {
  message?: string,
  progress?: number
}

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: '1rem'
}));

export const StatusBar = ({ message, progress }: StatusBarProps) =>
  <Grid
    container
    spacing={0}
    justifyContent='flex-start'
    alignItems='flex-end'
    minHeight='1.2rem'>
    < Grid xs={3} >
      <BorderLinearProgress
        variant="determinate"
        value={progress}
        hidden={!progress} />
    </Grid >
    <Grid
      xs
      display='flex'
      justifyContent='flex-start'
      alignItems='center'>
      <Typography
        variant="caption"
        display="block"
        sx={{
          lineHeight: '1em'
        }}>
        {message}
      </Typography>
    </Grid>
  </Grid >;
