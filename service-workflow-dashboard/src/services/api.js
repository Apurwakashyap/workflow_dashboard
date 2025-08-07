import axios from "axios";

const API_URL = "http://localhost:5000";

const api = {
    getRequests: () => axios.get(`${API_URL}/requests`),
    addRequest: (data) => axios.post(`${API_URL}/requests`, data),
    updateRequest: (id, data) => axios.patch(`${API_URL}/requests/${id}`, data),
    deleteRequest: (id) => axios.delete(`${API_URL}/requests/${id}`)
};

export default api;
