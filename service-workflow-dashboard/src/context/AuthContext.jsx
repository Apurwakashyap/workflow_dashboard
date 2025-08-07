import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = async (username, password) => {
        try {
            const res = await axios.get("http://localhost:5000/users", {
                params: { username, password }
            });

            if (res.data.length > 0) {
                const loggedInUser = res.data[0];
                setUser(loggedInUser);
                localStorage.setItem("user", JSON.stringify(loggedInUser));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
