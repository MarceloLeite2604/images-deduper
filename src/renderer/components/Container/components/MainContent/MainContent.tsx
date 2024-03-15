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
      container
      direction='column'
      display='flex'
      justifyContent='flex-start'
      alignContent='stretch'
      flexGrow={1}>
      <Grid
        display='flex'
        justifyContent='center'
        alignItems='center'>
        <SelectDirectoryButton />
      </Grid>
      <Grid
        flexGrow={1}
        height={0}
        id='main-content-second-cell-grid-item'>
        <Grid
          id='main-content-second-cell-grid-container'
          container
          direction='row'
          display='flex'
          height='100%'>
          <Grid
            flexGrow={3}
            id='duplicated-images-area-grid-item'
            height='100%'>
            <DuplicatedImagesArea />
          </Grid>
          {selectedImageLocations &&
            <Grid
              flexGrow={1}
              id='image-details-area-grid-item'>
              <ImageDetailsArea locations={selectedImageLocations} />
            </Grid>}
        </Grid>
      </Grid >
    </Grid>
  );
};
