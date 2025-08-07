import React, { useContext, useState } from "react";
import { RequestContext } from "../context/RequestContext";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";

export default function RequestTable({ onAddClick }) {
    const { requests } = useContext(RequestContext);
    const { enqueueSnackbar } = useSnackbar();
    const [statusFilter, setStatusFilter] = useState("All");

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/requests/${id}`, { method: "DELETE" });
            enqueueSnackbar("Request deleted successfully", { variant: "success" });
            window.location.reload();
        } catch (error) {
            enqueueSnackbar("Failed to delete request", { variant: "error" });
        }
    };

    const filteredRequests =
        statusFilter === "All"
            ? requests
            : requests.filter((req) => req.status === statusFilter);

    return (
        <Paper sx={{ padding: 2, borderRadius: "12px" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                    gap: 2,
                }}
            >
                <h2 style={{ margin: 0 }}>Requests</h2>

                {/* Status Filter Dropdown */}
                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Status Filter</InputLabel>
                    <Select
                        value={statusFilter}
                        label="Status Filter"
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Open">Open</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Resolved">Resolved</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleIcon />}
                    onClick={onAddClick}
                    sx={{ textTransform: "none", borderRadius: "8px" }}
                >
                    Add Request
                </Button>
            </Box>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Assigned To</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredRequests.length > 0 ? (
                        filteredRequests.map((req) => (
                            <TableRow
                                key={req.id}
                                hover
                                sx={{
                                    "&:hover": { backgroundColor: "#f9f9f9" },
                                }}
                            >
                                <TableCell>{req.title}</TableCell>
                                <TableCell>{req.status}</TableCell>
                                <TableCell>{req.assignedTo}</TableCell>
                                <TableCell>
                                    <IconButton color="error" onClick={() => handleDelete(req.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                No requests found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Paper>
    );
}
