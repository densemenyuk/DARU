import {
  Box,
  Button,
  Container,
  FormGroup as MuiFormGroup,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authUser } from '../services/auth';
import { AuthRequest } from '../types/auth';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AuthRequest>({
    mode: 'onChange',
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = (data: AuthRequest) => {
    authUser(data).then((r) => {
      login(r);
      navigate('/');
    });
  };

  return (
    <Container>
      <Box display={'flex'} justifyContent={'center'} mb={'24px'}>
        <Typography variant="h3">Welcome back!</Typography>
      </Box>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <TextField
            type="text"
            placeholder="Email"
            {...register('identifier', {
              required: 'Введите ваш email',
            })}
            error={Boolean(errors.identifier)}
            helperText={errors.identifier?.message}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Введите ваш пароль',
            })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
        </FormGroup>
        <Button
          type="submit"
          variant="contained"
          sx={{ background: '#FF4500' }}
        >
          <Link to={'/'}>Login</Link>
        </Button>
      </StyledForm>
    </Container>
  );
};

const StyledForm = styled('form')`
  width: 500px;
  margin: 0 auto;
`;

const FormGroup = styled(MuiFormGroup)`
  margin-bottom: 16px;
`;
