import { Card, CardContent, CardHeader, CardMedia, Grid } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CmsEvent } from '../../types/events';

type Props = {
  events: CmsEvent[];
};

export const Events: FC<Props> = ({ events }) => {
  return (
    <Grid container spacing={2}>
      {events.map((item) => (
        <Grid key={item.id} item xs={4}>
          <Link to={`events/details/${item.id}`}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                title={item.attributes.event_category?.data.attributes.title}
              />
              <CardMedia
                component="img"
                height="230"
                image={item.attributes.cover.data.attributes.url}
                alt="Paella dish"
              />
              <CardContent> {item.attributes.title}</CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
