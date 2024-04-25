import { Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Events } from '../../components/events/Events';
import { useAuth } from '../../hooks/useAuth';
import { getMyEvents } from '../../services/events';
import { CmsEvent } from '../../types/events';

export const MyEvents = () => {
  const [events, setEvents] = useState<CmsEvent[]>([]);

  const { userId } = useAuth();
  useEffect(() => {
    getMyEvents().then((r) => {
      console.log(r);
      setEvents(r.data);
    });
  }, [userId]);

  useEffect(() => {}, []);

  return (
    <Container>
      <Link to="/cabinet/events/create">Add new event </Link>
      <Box mt={'15px'}>
        <Events events={events} />
      </Box>
    </Container>
  );
};
