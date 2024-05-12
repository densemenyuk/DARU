import { Box, Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEvent } from '../services/events';
import { CmsEvent } from '../types/events';

export const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<CmsEvent>();

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

  return (
    <StyeledContainer>
      <Typography variant="h3">{event?.attributes.title} </Typography>
      {/* <Typography>Голосов: {event?.attributes.votes ?? 0}</Typography> */}
      <Box mt={'24px'}>
        <ImageContainer fullWidth>
          <img src={event?.attributes.cover.data.attributes.url} />
        </ImageContainer>
        <Typography>{event?.attributes.description}</Typography>
      </Box>
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
