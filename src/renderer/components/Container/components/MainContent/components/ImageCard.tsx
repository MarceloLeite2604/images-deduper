import {
  Card,
  CardActionArea,
  CardMedia,
  CardMediaProps,
  styled
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ImageProperties, localFileProtocol } from '../../../../../../shared';
import { RendererContext } from '../../../contexts';
import {
  MouseEventHandler,
  useCallback,
  useContext
} from 'react';
import pathBrowserify from 'path-browserify';

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

  const relativeImagePath = imageProperties.relativePaths
    .find(({ excluded }) => !excluded)
    ?.path;

  const { context, updateContext } = useContext(RendererContext);

  const location = `${localFileProtocol}://${pathBrowserify.resolve(context.rootDirectory, relativeImagePath)}`;

  const selected = imageProperties.checksum === context.selectedImage?.checksum;

  const setSelectedImage = useCallback((selectedImage?: ImageProperties) => {
    console.log(selectedImage);

    updateContext({ selectedImage })
  }, [updateContext]);

  const toggleImage: MouseEventHandler = () => {

    if (selected) {
      setSelectedImage();
    } else {
      setSelectedImage(imageProperties);
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