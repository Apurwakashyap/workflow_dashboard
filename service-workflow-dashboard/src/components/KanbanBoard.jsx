import React, { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { RequestContext } from "../context/RequestContext";
import { Paper, Typography } from "@mui/material";

export default function KanbanBoard() {
    const { requests, updateRequest } = useContext(RequestContext);

    const columns = {
        Open: requests.filter((req) => req.status === "Open"),
        "In Progress": requests.filter((req) => req.status === "In Progress"),
        Resolved: requests.filter((req) => req.status === "Resolved"),
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { draggableId, destination } = result;
        updateRequest(parseInt(draggableId), { status: destination.droppableId });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
                {Object.keys(columns).map((col) => (
                    <Droppable droppableId={col} key={col}>
                        {(provided) => (
                            <Paper
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                sx={{ flex: 1, padding: 2, minHeight: "400px" }}
                            >
                                <Typography variant="h6" align="center" gutterBottom>{col}</Typography>
                                {columns[col].map((req, index) => (
                                    <Draggable key={req.id} draggableId={req.id.toString()} index={index}>
                                        {(provided) => (
                                            <Paper
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                sx={{ padding: 1, marginBottom: 1 }}
                                            >
                                                <Typography>{req.title}</Typography>
                                                <Typography variant="caption">{req.assignedTo}</Typography>
                                            </Paper>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Paper>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
}
