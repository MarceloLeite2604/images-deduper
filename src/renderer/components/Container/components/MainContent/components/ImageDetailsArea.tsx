import {
  Box,
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

interface ImageDetailsAreaProperties {
  imagePath: string,
  locations: string[]
}

interface LocationListItemProperties {
  location: string,
  value: string
};

const LocationListItem = ({ location, value }: LocationListItemProperties) => (
  <ListItem sx={{
    paddingTop: '0px'
  }}>
    <ListItemIcon>
      <Radio
        edge="end"
        value={value}
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

export const ImageDetailsArea = ({ locations, imagePath }: ImageDetailsAreaProperties) => {
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
              {locations.map((location, index) => (
                <LocationListItem
                  location={location}
                  value={"" + index}
                  key={"" + index} />))}
            </RadioGroup>
          </List>
        </Grid>
      </CardContent>
    </Card >
  )
}