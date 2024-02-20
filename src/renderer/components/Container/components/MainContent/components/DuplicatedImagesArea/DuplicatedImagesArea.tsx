import { Card, CardMedia } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const ImageCard = (imagePath: string) => {
  return (
    <Grid xs={3}>
      <Card sx={{ maxWidth: 340 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={imagePath}>
        </CardMedia>
      </Card>
    </Grid>);

};

export const DuplicatedImagesArea = () => {
  return (
    <Grid container>
    </Grid>
  );
};
