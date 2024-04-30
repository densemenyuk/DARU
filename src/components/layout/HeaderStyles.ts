import { styled } from '@mui/material';

export const Nav = styled('nav')`
  margin: 0 24px;
  display: flex;
  gap: 14px;
  a {
    text-decoration: none;
    color: white;
  }
  a:hover {
    text-decoration: underline;
    cursor: pointer;
    color: #213547;
  }
`;

export const H1 = styled('div')`
  color: #213547;
`;

export const MuiAppBar = styled('div')`
  color: black;
`;

export const StyledMenuItem = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 150px;
`;
