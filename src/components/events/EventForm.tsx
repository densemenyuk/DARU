import {
  Box,
  Button,
  FormGroup,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getCategories, uploadFile } from '../../services/events';
import {
  CmsCreateEventRequest,
  CmsEvent,
  CmsEventCategory,
} from '../../types/events';

type Props = {
  initialData?: CmsEvent;
  onSubmit: (data: CmsCreateEventRequest) => void;
};
export const EventForm: FC<Props> = ({ initialData, onSubmit }) => {
  const [categories, setCategories] = useState<CmsEventCategory[]>([]);
  const [coverLoading, setCoverLoading] = useState(false);
  const {
    handleSubmit,
    setValue,
    register,
    getValues,
    formState: { errors },
  } = useForm<CmsCreateEventRequest>({
    defaultValues: {
      title: initialData ? initialData.attributes.title : '',
      description: initialData ? initialData.attributes.description : '',
      event_category: initialData?.attributes.event_category.data
        ? initialData.attributes.event_category.data.id
        : null,
      cover: initialData?.attributes.cover.data
        ? initialData.attributes.cover.data.id
        : null,
      creator: initialData?.attributes.creator.data
        ? initialData.attributes.creator.data.id
        : 0,
    },
  });
  console.log(getValues());
  const [coverPreview, setCoverPreview] = useState(
    initialData?.attributes.cover.data
      ? initialData.attributes.cover.data.attributes.url
      : ''
  );

  const handleCoverSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      const file = e.target.files[0];
      console.log(file);
      const fd = new FormData();
      fd.append('files', file);
      setCoverLoading(true);
      uploadFile(fd)
        .then((r) => {
          if (r.length > 0) {
            setValue('cover', r[0].id);
            setCoverPreview(r[0].url);
          }
        })
        .finally(() => {
          setCoverLoading(false);
        });
    }
  };

  useEffect(() => {
    getCategories().then((r) => {
      console.log(r);
      setCategories(r.data);
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Select
          {...register('event_category', {
            required: 'Выберите категорию',
          })}
          defaultValue={initialData?.attributes.event_category.data?.id || null}
          error={Boolean(errors.event_category)}
        >
          {categories.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.attributes.title}
            </MenuItem>
          ))}
        </Select>
        {errors.event_category?.message && (
          <Typography>{errors.event_category.message}</Typography>
        )}
      </FormGroup>
      <FormGroup sx={{ marginTop: '12px' }}>
        <TextField
          placeholder="Title"
          {...register('title', { required: 'Укажите название' })}
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
        />
      </FormGroup>
      <FormGroup sx={{ marginTop: '12px' }}>
        <TextField placeholder="Description" {...register('description')} />
      </FormGroup>
      <Box mt={'16px'} maxWidth={'300px'}>
        <input type="file" onChange={handleCoverSelect} />
        {coverPreview && (
          <Box mt={'16px'}>
            <img src={coverPreview} style={{ width: '100%' }} />
          </Box>
        )}
      </Box>
      <Box mt={'24px'}>
        <Button variant="contained" type="submit" disabled={coverLoading}>
          {initialData ? 'Сохранить' : 'Создать'}
        </Button>
      </Box>
    </form>
  );
};
