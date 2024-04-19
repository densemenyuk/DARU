import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Events } from '../components/events/Events';
import { getEvents } from '../services/events';
import { CmsEvent } from '../types/events';

export const EventsPage = () => {
  const [events, setEvents] = useState<CmsEvent[]>([]);

  const { type } = useParams();

  useEffect(() => {
    getEvents({
      sort: type === 'new' ? 'createdAt:desc' : 'votes:desc',
    }).then((r) => {
      setEvents(r.data);
    });
  }, [type]);

  return <Events events={events} />;
};
