import { styled } from '@mui/material';
import { lime, purple } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

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

export const MuiAppBar = createTheme({
  palette: {
    primary: lime,
    secondary: purple,
  },
});
