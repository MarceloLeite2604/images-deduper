import {
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
      primary={location} />
  </ListItem>
)

export const ImageDetailsArea = ({ locations }: ImageDetailsAreaProperties) => {
  return (
    <Card>
      <CardMedia
        component='img'
        image={locations[0]}
        height={340}
        sx={{ objectFit: "contain" }} />
      <CardContent>
        <Typography variant="body1">
          Located at
        </Typography>
        <List sx={{ width: '100%', maxWidth: 140 }}>
          {locations.map((location, index) => (
            <LocationListItem
              location={location}
              key={"" + index} />))}
        </List>
      </CardContent>
    </Card >
  )
}