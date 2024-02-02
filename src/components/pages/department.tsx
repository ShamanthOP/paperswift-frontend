import useDepartments from "@/hooks/use-departments";
import { useParams } from "react-router-dom";
import DepartmentForm from "../department-form";

const DepartmentPage = () => {
    const { data: departments, isLoading } = useDepartments();
    const params = useParams();

    if (isLoading) {
        return null;
    }

    return (
        <div className="space-y-4 p-12 pt-6 h-[calc(100vh-4rem)]">
            <DepartmentForm
                initialData={departments?.find(
                    (department) => department.code === params.code
                )}
            />
        </div>
    );
};

export default DepartmentPage;
