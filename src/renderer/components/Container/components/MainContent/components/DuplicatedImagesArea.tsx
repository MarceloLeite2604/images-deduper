import Grid from '@mui/material/Unstable_Grid2';
import { useContext } from 'react';
import { DuplicatedImagesContext } from '../../../contexts';
import { ImageCard } from './ImageCard';

export const DuplicatedImagesArea = () => {

  const { imagesProperties } = useContext(DuplicatedImagesContext);

  return (
    <Grid
      container
      overflow="auto"
      height="100%"
      spacing={1}
      display='flex'
      flexGrow={1}>
      {[...imagesProperties.entries()].map(([checksum, imageProperties]) =>
        <ImageCard
          key={checksum}
          imageProperties={imageProperties} />
      )}
    </Grid>
  );
};
