import { Card, CardMedia } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useContext } from 'react';
import { DuplicatedImagesContext } from '../../../../contexts';
import { ImageProperties } from '../../../../../../../shared/types';

interface ImageCardProperties {
  imageProperties: ImageProperties
};

const ImageCard = ({ imageProperties }: ImageCardProperties) => {

  return (
    <Grid xs={3}>
      <Card sx={{ maxWidth: 340 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={imageProperties.nativeImage.toDataURL()}>
        </CardMedia>
      </Card>
    </Grid>);

};

export const DuplicatedImagesArea = () => {

  const { imagesProperties } = useContext(DuplicatedImagesContext);

  return (
    <Grid container>
      {[...imagesProperties.entries()].map(([checksum, imageProperties]) =>
        <ImageCard
          key={checksum}
          imageProperties={imageProperties} />
      )}
    </Grid>
  );
};
