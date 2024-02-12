import './App.css'
import styled, { ThemeProvider } from 'styled-components';
import { Nav } from './components/nav';
import { Outlet } from 'react-router-dom';

const MainContent = styled.main`
  height: 100svh;
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.fg};
`;

const theme = {
  fg: "#D4D4D4",
  bg: "#181818",
  primary: "#303030",
  secondary: "#242424"
};

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <MainContent>
          <Nav/>
          <Outlet/>
        </MainContent>
      </ThemeProvider>
    </>
  )
}

export default App
