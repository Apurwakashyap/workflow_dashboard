import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Home({ summary }) {
    const cards = [
        { title: "Open", value: summary.open, icon: <AssignmentIcon sx={{ fontSize: 40 }} color="primary" />, color: "#e3f2fd" },
        { title: "In Progress", value: summary.inProgress, icon: <PendingActionsIcon sx={{ fontSize: 40 }} color="warning" />, color: "#fff3e0" },
        { title: "Resolved", value: summary.resolved, icon: <CheckCircleIcon sx={{ fontSize: 40 }} color="success" />, color: "#e8f5e9" },
    ];

    return (
        <Grid container spacing={3} justifyContent="flex-start" sx={{ padding: 2 }}>
            {cards.map((card) => (
                <Grid item xs={12} sm={6} md={4} key={card.title}>
                    <Card sx={{ backgroundColor: card.color, textAlign: "center", padding: 2 }}>
                        <CardContent>
                            {card.icon}
                            <Typography variant="h6" sx={{ marginTop: 1 }}>{card.title}</Typography>
                            <Typography variant="h4" sx={{ fontWeight: "bold" }}>{card.value}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
