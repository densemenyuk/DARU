import { Box, Container, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Events } from '../../components/events/Events';
import { useAuth } from '../../hooks/useAuth';
import { getMyEvents } from '../../services/events';
import { CmsEvent } from '../../types/events';

export const MyEvents = () => {
  const [events, setEvents] = useState<CmsEvent[]>([]);
  // const navigate = useNavigate();
  const { userId } = useAuth();

  useEffect(() => {
    getMyEvents(userId).then((r) => {
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
      {/* <Box mt={'18px'}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.attributes.title}</TableCell>
                <TableCell>{row.attributes.description}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      navigate(`/cabinet/events/edit/${row.id}`);
                    }}
                  >
                    <EditNote />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box> */}

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
