import { LinearProgress, styled } from '@mui/material';

const ThickLinearProgress = styled(LinearProgress)({ height: '1.2rem', borderRadius: '5px' });

ThickLinearProgress.defaultProps = {
  variant: 'determinate'
};

export { ThickLinearProgress };
