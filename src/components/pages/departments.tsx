import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { MinusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import useDepartments from "@/hooks/use-departments";
import DepartmentCard from "../department-card";

const DepartmentsPage = () => {
    const navigate = useNavigate();

    const { data: departments, isLoading } = useDepartments();

    if (isLoading || !departments) {
        return null;
    }

    console.log(departments);

    return (
        <div className="space-y-4 p-12 pt-6 h-[calc(100vh-4rem)]">
            <div className="flex items-center justify-between ">
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                    Departments ({departments.length})
                </h2>
                <Button onClick={() => navigate("new")}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add New Department
                </Button>
            </div>
            <Separator />
            {departments.length === 0 ? (
                <div className="flex flex-col gap-y-6 h-full items-center justify-center">
                    <MinusCircledIcon className="size-44 text-muted-foreground/20" />
                    <p className="text-muted-foreground text-lg">
                        There are no departments yet.
                    </p>
                    <Button onClick={() => navigate("new")}>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Create New Department
                    </Button>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {departments.map((department) => (
                        <DepartmentCard
                            department={department}
                            key={department.code}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DepartmentsPage;
