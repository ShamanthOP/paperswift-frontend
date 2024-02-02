import { Teacher } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "./use-auth";

const useTeachers = () => {
    const { key } = useAuth();

    const { data, isLoading, error } = useQuery<Teacher[]>({
        queryKey: ["teachers"],
        queryFn: async () => {
            const res = await axios.get(
                `${
                    import.meta.env.VITE_REACT_APP_BACKEND_URL
                }/management/teachers/`,
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

export default useTeachers;
