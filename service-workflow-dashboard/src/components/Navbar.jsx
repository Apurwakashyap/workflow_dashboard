import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <AppBar position="fixed" sx={{ zIndex: 1300 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Service Dashboard</Typography>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    {user && <Typography variant="body1">Welcome, {user.username}</Typography>}
                    <Button
                        color="error"
                        variant="contained"
                        startIcon={<LogoutIcon />}
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}
