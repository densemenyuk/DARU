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
              required: 'Enter your email',
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
              required: 'Enter your password',
            })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
        </FormGroup>
        <Button
          type="submit"
          //   variant="outlined"
          sx={{ background: '#FF4500', color: '#213547' }}
        >
          Login
        </Button>
        <Button
          sx={{
            marginLeft: '260px',
            // variant: 'outlined',
            background: '#FF4500',
            color: 'black',
            textDecoration: 'none',
          }}
        >
          <StyledLink to={'/auth/register'}>Create new account</StyledLink>
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

export const StyledLink = styled(Link)`
  :hover {
    color: #242424;
  }
`;
