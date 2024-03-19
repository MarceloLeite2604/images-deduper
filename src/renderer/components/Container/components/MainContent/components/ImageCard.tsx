import { Card, CardMedia } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { ImageProperties, localFileProtocol } from '../../../../../../shared';

interface ImageCardProperties {
  imageProperties: ImageProperties
}

export const ImageCard = ({ imageProperties }: ImageCardProperties) => {

  const location = `${localFileProtocol}://${imageProperties.locations[0]}`;

  return (
    <Grid
      xs={3}
      display='flex'
      alignContent='stretch'
      justifyContent='stretch'
      height='25%'
      sx={{ padding: '0.2rem' }}>
      <Card sx={{ flexGrow: 1 }}>
        <CardMedia
          sx={{
            height: '100%',
            backgroundSize: "cover"
          }}
          image={location}>
        </CardMedia>
      </Card>
    </Grid>
  );
};