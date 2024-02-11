import { BaseStyles, Container } from './components';

export const App = () =>
  <>
    <BaseStyles />
    {/* <Grid container
      direction='column'
      justifyContent='flex-start'
      alignItems='stretch'
      spacing={0}
      sx={{
        minHeight: '100vh'
      }}>
      <Grid item xs>
        <Grid container
          direction='column'
          alignItems='center'
          justifyContent='center'
          spacing={0}
          sx={{
            height: '100%'
          }}>
          <Grid item>
            <SelectDirectoryButton />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} >
        Status bar
      </Grid>
    </Grid > */}
    <Container />
  </>;
