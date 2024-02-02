import useTeachers from "@/hooks/use-teachers";
import { useParams } from "react-router-dom";
import TeacherForm from "../teacher-form";

const TeacherPage = () => {
    const { data: teachers, isLoading } = useTeachers();
    const params = useParams();

    if (isLoading) {
        return null;
    }

    return (
        <div className="space-y-4 p-12 pt-6 min-h-[calc(100vh-4rem)]">
            <TeacherForm
                initialData={teachers?.find(
                    (teacher) => String(teacher.id) === params.id
                )}
            />
        </div>
    );
};

export default TeacherPage;
