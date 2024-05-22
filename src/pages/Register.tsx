import {
  Button,
  Container,
  FormGroup as MuiFormGroup,
  TextField,
  styled,
} from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { registerUser } from '../services/auth';
import { RegisterRequest } from '../types/auth';
import { StyledLink } from './Login';

export const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterRequest>({
    username: '',
    password: '',
    email: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    registerUser(formData).then((r) => {
      login(r);
      navigate('/');
    });
  };

  return (
    <Container>
      <StyledDivTittle sx={{ textAlign: 'center' }}>Welcome!</StyledDivTittle>
      <StyledForm onSubmit={handleSubmit}>
        <FormGroup>
          <TextField
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => {
              setFormData((v) => ({ ...v, username: e.target.value }));
            }}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              setFormData((v) => ({ ...v, email: e.target.value }));
            }}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => {
              setFormData((v) => ({ ...v, password: e.target.value }));
            }}
          />
        </FormGroup>
        <Button
          sx={{
            // marginLeft: '260px',
            // variant: 'outlined',
            background: '#FF4500',
            color: 'black',
            textDecoration: 'none',
          }}
        >
          <StyledLink to={'/auth/login'}>Register</StyledLink>
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
  margin-bottom: 15px;
`;

const StyledDivTittle = styled('div')`
  font-size: 45px;
  color: #213547;
`;
