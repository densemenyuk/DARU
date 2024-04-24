import { useEffect, useState } from 'react';
import { Events } from '../../components/events/Events';
import { CmsEvent } from '../../types/events';

export const MyEvents = () => {
  const [events, setEvents] = useState<CmsEvent[]>([]);

  useEffect(() => {}, []);

  return <Events events={events} />;
};
