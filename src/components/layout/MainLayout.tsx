import { Outlet } from 'react-router-dom';
import { Header } from './Header.tsx';
import { Content, MainWrapper } from './MainStyles.ts';

export const MainLayout = () => {
  return (
    <MainWrapper>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </MainWrapper>
  );
};
