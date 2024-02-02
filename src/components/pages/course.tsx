import { useParams } from "react-router-dom";
import useCourses from "@/hooks/use-courses";
import CourseForm from "../course-form";

const CoursePage = () => {
    const { data: courses, isLoading } = useCourses();
    const params = useParams();

    if (isLoading) {
        return null;
    }

    return (
        <div className="space-y-4 p-12 pt-6 h-[calc(100vh-4rem)]">
            <CourseForm
                initialData={courses?.find(
                    (course) => course.code === params.code
                )}
            />
        </div>
    );
};

export default CoursePage;
