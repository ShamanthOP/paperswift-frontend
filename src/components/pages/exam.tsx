import useExams from "@/hooks/use-exams";
import { useParams } from "react-router-dom";
import ExamForm from "../exam-form";

const ExamPage = () => {
    const { data: exams, isLoading } = useExams();
    const params = useParams();

    if (isLoading) {
        return null;
    }

    return (
        <div className="space-y-4 p-12 pt-6 h-[calc(100vh-4rem)]">
            <ExamForm
                initialData={exams?.find(
                    (exam) => String(exam.eid) === params.eid
                )}
            />
        </div>
    );
};

export default ExamPage;
