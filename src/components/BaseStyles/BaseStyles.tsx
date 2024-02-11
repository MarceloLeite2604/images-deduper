import { CssBaseline, GlobalStyles } from '@mui/material';

export const BaseStyles = () =>
  <>
    <GlobalStyles styles={{
      body: {
        padding: 0,
        minWidth: '100vw'
      },
      'div#root': {
        minWidth: '100vw',
        minHeight: '100vh'
      }
    }} />
    <CssBaseline />
  </>;
