import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const fetchDashboard = async () => {
    const response = await axios.get(`http://localhost:8000/produtor/api/dashboard`);
    return response.data;
}

export function useDashboard() {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: fetchDashboard
    })
}