import { Department } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "./use-auth";

const useDepartments = () => {
    const { key } = useAuth();

    const { data, isLoading, error } = useQuery<Department[]>({
        queryKey: ["departments"],
        queryFn: async () => {
            const res = await axios.get(
                `${
                    import.meta.env.VITE_REACT_APP_BACKEND_URL
                }/management/departments/`,
                {
                    headers: {
                        Authorization: `Token ${key}`,
                    },
                }
            );
            return res.data;
        },
    });

    return { data, isLoading, error };
};

export default useDepartments;
