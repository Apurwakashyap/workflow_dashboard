import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { RequestProvider } from "./context/RequestContext";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#3a8fe3ff" },
    background: { default: "#8ca5bfff" },
  },
});

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <AuthProvider>
          <RequestProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Router>
          </RequestProvider>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
