import { LinearProgress, styled } from '@mui/material';

const ThickLinearProgress = styled(LinearProgress)({ height: '1rem' });

ThickLinearProgress.defaultProps = {
  variant: 'determinate'
};

export { ThickLinearProgress };
