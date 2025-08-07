import React, { useState, useContext } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from "@mui/material";
import { RequestContext } from "../context/RequestContext";
import { useSnackbar } from "notistack";

export default function RequestForm({ open, onClose }) {
    const { addRequest } = useContext(RequestContext);
    const { enqueueSnackbar } = useSnackbar();
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("Open");
    const [assignedTo, setAssignedTo] = useState("");

    const handleSubmit = () => {
        if (title && assignedTo) {
            addRequest({ title, status, assignedTo });
            enqueueSnackbar("Request added successfully", { variant: "success" });
            onClose();
            setTitle(""); setStatus("Open"); setAssignedTo("");
        } else {
            enqueueSnackbar("Please fill all fields", { variant: "warning" });
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Request</DialogTitle>
            <DialogContent>
                <TextField fullWidth label="Title" margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} />
                <TextField select fullWidth label="Status" margin="normal" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                </TextField>
                <TextField fullWidth label="Assigned To" margin="normal" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}
