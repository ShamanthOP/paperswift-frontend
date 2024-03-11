import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "./use-auth";
import { Degree } from "@/lib/types";

const useDegrees = () => {
    const { key } = useAuth();

    const { data, isLoading, error } = useQuery<Degree[]>({
        queryKey: ["degrees"],
        queryFn: async () => {
            const res = await axios.get(
                `${
                    import.meta.env.VITE_REACT_APP_BACKEND_URL
                }/management/degrees/`,
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

export default useDegrees;
