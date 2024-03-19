import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

interface ImageDetailsAreaProperties {
  locations: string[]
}

interface LocationListItemProperties {
  location: string,
  checked?: boolean
};

const LocationListItem = ({ location, checked = false }: LocationListItemProperties) => (
  <ListItem>
    <ListItemIcon>
      <Checkbox
        edge="start"
        checked={checked}
        tabIndex={-1}
        disableRipple
      />
    </ListItemIcon>
    <ListItemText
      primary={location}
      primaryTypographyProps={{ width: 0 }} />
  </ListItem>
)

export const ImageDetailsArea = ({ locations }: ImageDetailsAreaProperties) => {
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
      <Box sx={{ flexGrow: 2, height: 0 }}>
        <CardMedia
          component='img'
          image={locations[0]}
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
        <Typography variant="body1">
          Located at
        </Typography>
        <Grid
          container
          display='flex'
          flexDirection='column'
          flexGrow={1}
          height={0}>
          <List sx={{ overflow: 'auto' }}>
            {locations.map((location, index) => (
              <LocationListItem
                location={location}
                key={"" + index} />))}
          </List>
        </Grid>
      </CardContent>
    </Card >
  )
}