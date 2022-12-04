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
import DashboardRoute from "components/Routes/dasboardRoute";
import Dash from "components/pages/Dash";
import RegisterRoute from "components/Routes/RegisterRoute";

const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/dashboard/*"
              element={
                <DashboardRoute>
                  <Dash />
                </DashboardRoute>
              }
            />
            <Route
              path="/register"
              element={
                <RegisterRoute>
                  <RegisterPage />
                </RegisterRoute>
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
