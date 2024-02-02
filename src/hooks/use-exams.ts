import { Exam } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "./use-auth";

const useExams = () => {
    const { key } = useAuth();

    const { data, isLoading, error } = useQuery<Exam[]>({
        queryKey: ["exams"],
        queryFn: async () => {
            const res = await axios.get(
                `${
                    import.meta.env.VITE_REACT_APP_BACKEND_URL
                }/management/exams/`,
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

export default useExams;
