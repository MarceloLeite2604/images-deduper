import Grid from '@mui/material/Unstable_Grid2';
import {
  DuplicatedImagesArea,
  SelectDirectoryButton,
  ImageDetailsArea
} from './components';
import { useState } from 'react';

export const MainContent = () => {

  const [selectedImageLocations] = useState<string[]>(['local-file:///home/marcelo/Pictures/IMG-20220628-WA0002 (copy).jpg']);

  return (
    <Grid
      id="main-content-grid-container"
      container
      direction='column'
      display='flex'
      alignContent='stretch'
      flexGrow={1}>
      <Grid
        id="select-directory-main-content-grid-item"
        display='flex'
        justifyContent='center'
        alignContent='center'>
        <SelectDirectoryButton />
      </Grid>
      <Grid
        id='main-content-second-cell-grid-container'
        container
        direction='row'
        display='flex'
        flexGrow={1}
        height={0}>
        <Grid
          container
          display='flex'
          direction='row'
          justifyContent='flex-start'
          flexGrow={2}
          id='duplicated-images-area-second-cell-grid-item'
          maxHeight='100%'
          width={0}
          overflow="auto">
          <DuplicatedImagesArea />
        </Grid>
        {selectedImageLocations &&
          <Grid
            container
            flexGrow={1}
            width={0}
            id='image-details-area-second-cell-grid-container'
            sx={{
              height: '100%',
              maxHeight: '100%',
              padding: '0.4rem'
            }}>
            <ImageDetailsArea locations={selectedImageLocations} />
          </Grid>}
      </Grid>
    </Grid>
  );
};
