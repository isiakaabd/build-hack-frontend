import React, { createRef } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { CssBaseline, Typography } from "@mui/material";
import { AuthProvider } from "./components/context/AuthProvider";
const notistackRef = createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SnackbarProvider
    ref={notistackRef}
    maxSnack={3}
    action={(key) => (
      <Typography
        onClick={onClickDismiss(key)}
        style={{
          fontSize: "1.2rem",
          color: "ffffff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Dismiss
      </Typography>
    )}
  >
    <AuthProvider>
      <CssBaseline />
      <App />
    </AuthProvider>
  </SnackbarProvider>
);
