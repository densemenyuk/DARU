import { Box, Container, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Events } from '../../components/events/Events';
import { useAuth } from '../../hooks/useAuth';
import { getMyEvents } from '../../services/events';
import { CmsEvent } from '../../types/events';
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>;

export const MyEvents = () => {
  const [events, setEvents] = useState<CmsEvent[]>([]);
  //   const navigate = useNavigate();
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
      <BoxNewEvent>
        <Link to="/cabinet/events/create">Add new event</Link>
      </BoxNewEvent>
      <Box mt={'15px'}>
        <Events events={events} />
      </Box>
    </Container>
  );
};

export const BoxNewEvent = styled('div')`
  color: '#213547';
  font-size: 25px;
  &:hover {
    a {
      color: #ff4500;
      border-bottom: 1px solid;
    }
  }
`;
