import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Home from "../components/Home";
import RequestTable from "../components/RequestTable";
import RequestForm from "../components/RequestForm";
import KanbanBoard from "../components/KanbanBoard";
import Analytics from "../components/Analytics";
import { Box, Toolbar } from "@mui/material";

export default function Dashboard() {
    const [currentTab, setCurrentTab] = useState("Home");
    const [showForm, setShowForm] = useState(false);

    const summary = { open: 10, inProgress: 5, resolved: 8 };

    const renderContent = () => {
        switch (currentTab) {
            case "Home":
                return <Home summary={summary} />;
            case "Requests":
                return <RequestTable onAddClick={() => setShowForm(true)} />;
            case "Kanban":
                return <KanbanBoard />;
            case "Analytics":
                return <Analytics />;
            default:
                return <Home summary={summary} />;
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Navbar />
            <Sidebar onTabChange={setCurrentTab} currentTab={currentTab} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {renderContent()}
            </Box>
            <RequestForm open={showForm} onClose={() => setShowForm(false)} />
        </Box>
    );
}
