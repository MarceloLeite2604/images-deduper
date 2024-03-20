import { Card, CardActionArea, CardMedia, CardMediaProps, styled } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { ImageProperties, localFileProtocol } from '../../../../../../shared';
import { DuplicatedImagesContext } from '../../../contexts';
import { MouseEventHandler, useContext } from 'react';

interface ImageCardProperties {
  imageProperties: ImageProperties
}

interface DuplicatedImageCardMediaProps extends CardMediaProps {
  selected: boolean
}

const DuplicatedImageCardMedia = styled(CardMedia)<DuplicatedImageCardMediaProps>(({ selected, theme }) => ({
  borderRadius: '0.6em',
  ...(!selected && {
    ':hover': {
      border: `solid 0.4em ${theme.palette.primary.light}`,
    }
  }),
  ...(selected && {
    border: `solid 0.4em ${theme.palette.secondary.light}`
  })
}));

export const ImageCard = ({ imageProperties }: ImageCardProperties) => {

  const location = `${localFileProtocol}://${imageProperties.locations[0]}`;

  const { selectedImageChecksum, setSelectedImageChecksum } = useContext(DuplicatedImagesContext);

  const selected = imageProperties.checksum == selectedImageChecksum;

  const toggleImage: MouseEventHandler = () => {
    if (selected) {
      setSelectedImageChecksum(undefined);
    } else {
      setSelectedImageChecksum(imageProperties.checksum);
    }
  }

  return (
    <Grid
      xs={3}
      display='flex'
      alignContent='stretch'
      justifyContent='stretch'
      height='25%'
      sx={{ padding: '0.2rem' }}>
      <Card sx={{ flexGrow: 1 }}>
        <CardActionArea
          sx={{
            width: '100%',
            height: '100%',
          }}
          onClick={toggleImage}>
          <DuplicatedImageCardMedia
            selected={selected}
            sx={{
              height: '100%',
              backgroundSize: "cover"
            }}
            image={location}>
          </DuplicatedImageCardMedia>
        </CardActionArea>
      </Card>
    </Grid>
  );
};