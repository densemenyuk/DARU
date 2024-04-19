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
      <StyledForm onSubmit={handleSubmit}>
        <FormGroup>
          <TextField
            type="text"
            placeholder="Enter you username"
            value={formData.username}
            onChange={(e) => {
              setFormData((v) => ({ ...v, username: e.target.value }));
            }}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            type="text"
            placeholder="Enter you email"
            value={formData.email}
            onChange={(e) => {
              setFormData((v) => ({ ...v, email: e.target.value }));
            }}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            type="password"
            placeholder="Enter you password"
            value={formData.password}
            onChange={(e) => {
              setFormData((v) => ({ ...v, password: e.target.value }));
            }}
          />
        </FormGroup>
        <Button type="submit" variant="contained">
          Register
        </Button>
      </StyledForm>
    </Container>
  );
};

const StyledForm = styled('form')`
  width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled(MuiFormGroup)`
  margin-bottom: 15px;
`;
