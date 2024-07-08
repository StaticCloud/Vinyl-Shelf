import './App.css'
import styled, { ThemeProvider } from 'styled-components';
import Nav from './components/nav';
import { Outlet } from 'react-router-dom';

// Styled component for main content.
const MainContent = styled.main`
  height: 100svh;
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.fg};

  @media screen and (min-width: 768px) {
    margin-left: 60px; 
  }
`;

// Theme object with hex values for color schemes.
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
        <Nav/>
        <MainContent>
          <Outlet/>
        </MainContent>
      </ThemeProvider>
    </>
  )
}

export default App
