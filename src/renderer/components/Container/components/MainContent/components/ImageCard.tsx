import { Card, CardMedia } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { ImageProperties, localFileProtocol } from '../../../../../../shared';

interface ImageCardProperties {
  imageProperties: ImageProperties
}

export const ImageCard = ({ imageProperties }: ImageCardProperties) => {

  const location = `${localFileProtocol}://${imageProperties.locations[0]}`;

  return (
    <Grid xs={3}>
      <Card sx={{ maxWidth: 340 }}>
        <CardMedia
          sx={{ height: 140, minHeight: 0 }}
          image={location}>
        </CardMedia>
      </Card>
    </Grid>
  );
};