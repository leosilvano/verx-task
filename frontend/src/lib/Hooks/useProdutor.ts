import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const fetchProdutores = async () => {
    const response = await axios.get(`http://localhost:8000/produtor/api/`)
    return await response.data;
}

export function useProdutores() {
    return useQuery({
        queryKey: ['produtor'],
        queryFn: fetchProdutores
    })
}