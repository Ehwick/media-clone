// Conditional rendering by routing
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
// state management and theme functions
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from './theme';

function App() {
  // set up theme given a mode
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // authorized if token exists
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
  <div className="app">
    {/* Set up routes, provide theme for site */}
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
