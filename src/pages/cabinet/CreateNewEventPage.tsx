import { Container, FormGroup, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCategories } from '../../services/events';
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

  useEffect(() => {
    getCategories().then((r) => {
      console.log(r);
      setCategories(r.data);
    });
  }, []);

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
    </Container>
  );
};
