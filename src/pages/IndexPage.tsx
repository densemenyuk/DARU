import { useEffect, useState } from 'react';
import { Events } from '../components/events/Events';
import { getEvents } from '../services/events';
import { CmsEvent } from '../types/events';

export const IndexPage = () => {
  const [events, setEvents] = useState<CmsEvent[]>([]);

  useEffect(() => {
    getEvents({}).then((r) => {
      console.log(r);
      setEvents(r.data);
    });
  }, []);

  return <Events events={events} />;
};
