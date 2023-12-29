import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
// can do scenes/homepage bc of json config file
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// css baseline standardizes across browsers
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from './theme';

function App() {
  // grab state from store using useSelector
  const mode = useSelector((state) => state.mode);
  // set up our theme by passing specific mode
  // createTheme takes two arguments to create theme
  // passed to themeprovider
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // if token exists, we are now authorized
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
  <div className="app">
    {/* Setting up browser routes, :userId is a param */}
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route 
            path="/home" 
            element={isAuth ? <HomePage /> : <Navigate to="/" />} />
          <Route 
            path="/profile/:userId" 
            element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </div>
  );
};

export default App;
