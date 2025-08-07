import React, { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {
        const res = await api.getRequests();
        setRequests(res.data);
    };

    const addRequest = async (newRequest) => {
        const res = await api.addRequest(newRequest);
        setRequests((prev) => [...prev, res.data]);
    };

    const updateRequest = async (id, updatedFields) => {
        await api.updateRequest(id, updatedFields);
        setRequests((prev) =>
            prev.map((req) => (req.id === id ? { ...req, ...updatedFields } : req))
        );
    };

    return (
        <RequestContext.Provider value={{ requests, addRequest, updateRequest }}>
            {children}
        </RequestContext.Provider>
    );
};
