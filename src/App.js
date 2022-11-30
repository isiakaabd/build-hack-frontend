import "./App.css";
import { muiTheme } from "components/muiTheme";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  LandingPage,
  Dashboard,
  RegisterPage,
  LoginPage,
} from "components/pages";
import { PrivateRoute } from "components/Routes";
import { ThemeProvider } from "@mui/material/styles";

const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PrivateRoute>
                  <RegisterPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PrivateRoute>
                  <LoginPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
