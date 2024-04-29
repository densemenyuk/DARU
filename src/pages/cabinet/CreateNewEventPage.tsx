import {
  Button,
  Container,
  FormGroup,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { createEvent, getCategories, uploadFile } from '../../services/events';
import { CmsCreateEventRequest, CmsEventCategory } from '../../types/events';

export const CreateNewEventPage = () => {
  const [categories, setCategories] = useState<CmsEventCategory[]>([]);
  const [formData, setFormData] = useState<CmsCreateEventRequest>({
    title: '',
    description: '',
    event_category: 0,
    cover: null,
    creator: 0,
  });
  const navigate = useNavigate();
  const [coverPreview, setCoverPreview] = useState('');
  const { userId } = useAuth();

  useEffect(() => {
    getCategories().then((r) => {
      console.log(r);
      setCategories(r.data);
    });
  }, []);

  console.log(formData);

  const handleCoverSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      const file = e.target.files[0];
      console.log(file);
      const fd = new FormData();
      fd.append('files', file);

      uploadFile(fd).then((r) => {
        if (r.length > 0) {
          setFormData((v) => ({ ...v, cover: r[0].id }));
          setCoverPreview(r[0].url);
        }
      });
    }
  };

  const handleSubmit = () => {
    createEvent({ ...formData, creator: userId }).then((r) => {
      if (r.data) {
        navigate('/cabinet/events');
      }
    });
  };

  return (
    <Container>
      <FormGroup>
        <Select
          value={formData.event_category}
          onChange={(e) =>
            setFormData((v) => ({
              ...v,
              event_category: e.target.value ? +e.target.value : 0,
            }))
          }
        >
          {categories.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.attributes.title}
            </MenuItem>
          ))}
        </Select>
      </FormGroup>
      <FormGroup>
        <TextField
          sx={{ marginTop: '13px' }}
          placeholder="Title"
          value={formData.title}
          onChange={(e) =>
            setFormData((v) => ({
              ...v,
              title: e.target.value,
            }))
          }
        />
      </FormGroup>
      <FormGroup>
        <TextField
          sx={{ marginTop: '13px', marginBottom: '13px' }}
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData((v) => ({
              ...v,
              description: e.target.value,
            }))
          }
        />
      </FormGroup>
      <input type="file" onChange={handleCoverSelect} />
      {coverPreview && <img src={coverPreview} />}
      <Button
        sx={{
          color: '#FF4500	',
          border: 'solid 1px #FF4500',
          background: 'white',
          width: '90px',
        }}
        onClick={handleSubmit}
      >
        Save
      </Button>
    </Container>
  );
};
