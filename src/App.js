import "./App.css";
import { muiTheme } from "components/muiTheme";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login, Dashboard } from "components/pages";
import { PrivateRoute } from "components/Routes";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
