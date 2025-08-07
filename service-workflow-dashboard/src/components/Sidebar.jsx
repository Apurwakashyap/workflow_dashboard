import React from "react";
import { Drawer, Toolbar, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import PieChartIcon from "@mui/icons-material/PieChart";

const drawerWidth = 240;

export default function Sidebar({ onTabChange, currentTab }) {
    const tabs = [
        { name: "Home", icon: <HomeIcon /> },
        { name: "Requests", icon: <ListAltIcon /> },
        { name: "Kanban", icon: <ViewKanbanIcon /> },
        { name: "Analytics", icon: <PieChartIcon /> },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
        >
            <Toolbar />
            <List>
                {tabs.map((tab) => (
                    <ListItemButton
                        key={tab.name}
                        selected={currentTab === tab.name}
                        onClick={() => onTabChange(tab.name)}
                    >
                        <ListItemIcon>{tab.icon}</ListItemIcon>
                        <ListItemText primary={tab.name} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
}
