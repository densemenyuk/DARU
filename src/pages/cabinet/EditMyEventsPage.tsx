import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { EventForm } from '../../components/events/EventForm';
import { useAuth } from '../../hooks/useAuth';
import { getEvent, updateEvent } from '../../services/events';
import { CmsCreateEventRequest, CmsEvent } from '../../types/events';

export const EditMyEventsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userId } = useAuth();
  const [event, setEvent] = useState<CmsEvent>();

  useEffect(() => {
    if (!id) {
      return;
    }
    getEvent(+id).then((r) => {
      setEvent(r.data);
    });
  }, [id]);

  const handleSubmit = (data: CmsCreateEventRequest) => {
    if (!id) {
      return;
    }
    updateEvent(+id, { ...data, creator: userId })
      .then((r) => {
        if (r.data) {
          toast.success('Данные обновлены');
          navigate('/cabinet/events');
        }
      })
      .catch((e) => {
        toast.error('Произошла ошибка ' + e.message);
      });
  };

  return (
    <Container>
      {event && <EventForm initialData={event} onSubmit={handleSubmit} />}
    </Container>
  );
};
