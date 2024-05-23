import { AddReaction } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getEvent, voteEvent } from '../services/events';
import { CmsEvent } from '../types/events';

export const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<CmsEvent>();
  const { userId } = useAuth();

  const fetchData = (id: number) => {
    getEvent(id).then((r) => {
      setEvent(r.data);
    });
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchData(+id);
  }, [id]);

  const handleVote = async () => {
    if (!id) {
      return;
    }
    const res = await voteEvent(+id);
    await fetchData(+id);
    if (res.data) {
      toast.success('Ваш голос засчитан!');
    }
  };

  if (!event) {
    return <CircularProgress />;
  }

  return (
    <StyeledContainer>
      <Typography variant="h3">{event?.attributes.title} </Typography>
      <Box mt={'24px'}>
        <ImageContainer fullWidth>
          <img src={event?.attributes.cover.data.attributes.url} />
        </ImageContainer>
        <Typography>{event?.attributes.description}</Typography>
      </Box>
      {!!userId && (
        <Box>
          <IconButton onClick={handleVote}>
            <AddReaction />
          </IconButton>
        </Box>
      )}
      <Typography>Голосов: {event?.attributes.votes ?? 0}</Typography>
    </StyeledContainer>
  );
};

const ImageContainer = styled('div')<{
  fullWidth?: boolean;
}>`
  display: flex;
  justify-content: center;

  & > img {
    width: 400px;
    max-width: ${(props) => (props.fullWidth ? '100%' : '400px')};
  }
`;

const StyeledContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
