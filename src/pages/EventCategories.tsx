import { Box, Chip, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Events } from '../components/events/Events';
import { getCategories, getEvents } from '../services/events';
import { CmsEvent, CmsEventCategory } from '../types/events';

export const CategoriesPage = () => {
  const [selectedId, setSelectedId] = useState<number>();

  const [events, setEvents] = useState<CmsEvent[]>([]);

  const [categories, setCategories] = useState<CmsEventCategory[]>([]);

  useEffect(() => {
    getCategories().then((r) => {
      console.log(r);
      setCategories(r.data);
    });
  }, []);

  useEffect(() => {
    if (!selectedId) {
      return;
    }
    getEvents({ categoryId: selectedId }).then((r) => {
      setEvents(r.data);
    });
  }, [selectedId]);

  return (
    <Container>
      <Box display={'flex'} gap={'16px'}>
        {categories.map((item) => (
          <Chip
            key={item.id}
            label={item.attributes.title}
            onClick={() => setSelectedId(item.id)}
            variant={selectedId === item.id ? 'filled' : 'outlined'}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Box>
      {events?.length > 0 && (
        <Box marginTop={'30px'}>
          <Events events={events} />
        </Box>
      )}
    </Container>
  );
};
