import { CssBaseline, GlobalStyles } from '@mui/material';

export const BaseStyles = () =>
  <>
    <GlobalStyles styles={{
      html: {
        height: '100%'
      },
      body: {
        padding: 0,
        height: '100%',
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif'
      },
      'div#root': {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }
    }} />
    <CssBaseline />
  </>;
