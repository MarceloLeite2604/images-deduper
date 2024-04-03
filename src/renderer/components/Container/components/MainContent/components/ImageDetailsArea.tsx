import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useContext } from 'react';
import { RendererContext } from '../../../contexts';
import pathBrowserify from 'path-browserify';
import { localFileProtocol } from '../../../../../../shared';

interface LocationListItemProperties {
  location: string,
  value: number,
  checked: boolean,
  onClick: React.MouseEventHandler<HTMLButtonElement>
};

const LocationListItem = ({ location, value, checked, onClick }: LocationListItemProperties) => (
  <ListItem sx={{
    paddingTop: '0px'
  }}>
    <ListItemIcon>
      <Radio
        edge="end"
        value={"" + value}
        checked={checked}
        onClick={onClick}
        sx={{
          padding: '0.2rem'
        }}
      />
    </ListItemIcon>
    <ListItemText
      primary={location}
      primaryTypographyProps={{ width: '100%' }} />
  </ListItem>
)

export const ImageDetailsArea = () => {

  const { context: { rootDirectory, selectedImage } } = useContext(RendererContext);

  const { relativePaths: selectedImageRelativePaths } = selectedImage;

  const path = selectedImageRelativePaths.find(({ excluded }) => !excluded)?.path;

  const imagePath = `${localFileProtocol}://${pathBrowserify.resolve(rootDirectory, path)}`;

  const setSelectedPath = (selectedIndex?: number) => {
    selectedImage.relativePaths.forEach((relativePath, index) =>
      relativePath.selected = (index === selectedIndex)
    );
  }

  return (
    <Card
      id='image-details-area-card'
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: '100%',
        overflow: 'auto'
      }}>
      <Box sx={{
        flexGrow: 2,
        height: 0,
        display: 'flex'
      }}>
        <CardMedia
          component='img'
          image={imagePath}
          sx={{
            flexGrow: 1,
            objectFit: "contain",
            maxHeight: '100%'
          }} />
      </Box>
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Typography variant="h5">
          Select one location to preserve
        </Typography>
        <Grid
          container
          display='flex'
          flexDirection='column'
          flexGrow={1}
          height={0}>
          <List sx={{ overflow: 'auto' }}>
            <RadioGroup>
              {selectedImageRelativePaths.map(({ path, selected }, index) => (
                <LocationListItem
                  location={path}
                  value={index}
                  checked={selected}
                  onClick={() => setSelectedPath(selected ? undefined : index)}
                  key={"" + index} />))}
            </RadioGroup>
          </List>
        </Grid>
        <Grid
          display='flex'
          justifyContent='center'>
          <Button
            variant='contained'
            disabled={selectedImage === undefined}>Move other {selectedImage.relativePaths.length > 0 ? 'copies' : 'copy'} to trash</Button>
        </Grid>
      </CardContent>
    </Card >
  )
}