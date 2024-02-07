import './App.css'
import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Nav } from './components/nav';
import { Outlet } from 'react-router-dom';

const MainContent = styled.main`
  height: 100svh;
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.fg};
`;

const lightTheme = {
  fg: "#414141",
  bg: "#D4D4D4"
};

function App() {

  const [currentTheme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")))

  if (!currentTheme) {
    setTheme(lightTheme)
  }

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(currentTheme))
  }, [currentTheme])

  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <MainContent>
          <Nav/>
          <Outlet/>
        </MainContent>
      </ThemeProvider>
    </>
  )
}

export default App
