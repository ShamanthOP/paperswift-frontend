import { User } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "./use-auth";

const useUser = () => {
    const { key } = useAuth();

    const { data, isLoading, error } = useQuery<User>({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/user/`,
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

export default useUser;
