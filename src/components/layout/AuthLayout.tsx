import { Outlet } from 'react-router-dom';
import { AuthWrapper } from './Auth.style.ts';

export const AuthLayout = () => {
  return (
    <AuthWrapper>
      <Outlet />
    </AuthWrapper>
  );
};
