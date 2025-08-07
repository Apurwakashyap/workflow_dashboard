import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Paper, Box } from "@mui/material";
import { Pie, Bar, Line, Scatter } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
} from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

export default function Analytics() {
    const [chartType, setChartType] = useState("Pie");
    const [analyticsData, setAnalyticsData] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/analytics")
            .then((res) => setAnalyticsData(res.data))
            .catch((err) => console.error("Failed to fetch analytics:", err));
    }, []);

    const renderChart = () => {
        if (!analyticsData) return <p>Loading chart...</p>;

        const options = { maintainAspectRatio: false };

        switch (chartType) {
            case "Pie":
                return <Pie data={analyticsData} options={options} />;
            case "Bar":
                return <Bar data={analyticsData} options={options} />;
            case "Line":
                return <Line data={analyticsData} options={options} />;
            case "Scatter":
                return (
                    <Scatter
                        data={{
                            datasets: [
                                {
                                    label: "Requests Scatter",
                                    data: analyticsData.datasets[0].data.map((value, index) => ({
                                        x: value,
                                        y: index + 1,
                                    })),
                                    backgroundColor: "#1976d2",
                                },
                            ],
                        }}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                x: { beginAtZero: true },
                                y: { beginAtZero: true },
                            },
                        }}
                    />
                );
            default:
                return <Pie data={analyticsData} options={options} />;
        }
    };

    return (
        <Paper sx={{ padding: 3 }}>
            <h2 style={{ marginBottom: "20px" }}>Request Analytics</h2>
            <Box sx={{ width: "300px", marginBottom: "20px" }}>
                <FormControl fullWidth>
                    <InputLabel>Select Chart Type</InputLabel>
                    <Select value={chartType} onChange={(e) => setChartType(e.target.value)}>
                        <MenuItem value="Pie">Pie Chart</MenuItem>
                        <MenuItem value="Bar">Bar Chart</MenuItem>
                        <MenuItem value="Line">Line Chart</MenuItem>
                        <MenuItem value="Scatter">Scatter Chart</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ height: "400px", display: "flex", justifyContent: "center" }}>
                {renderChart()}
            </Box>
        </Paper>
    );
}
