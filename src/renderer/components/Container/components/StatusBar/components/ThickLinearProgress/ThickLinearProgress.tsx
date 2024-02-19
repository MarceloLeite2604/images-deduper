import { LinearProgress, styled } from '@mui/material';

const ThickLinearProgress = styled(LinearProgress)({
  height: '1.2rem',
  borderRadius: '5px',
  margin: '3px 5px 3px 3px'
});

ThickLinearProgress.defaultProps = {
  variant: 'determinate'
};

export { ThickLinearProgress };
