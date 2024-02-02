import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { MinusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import useTeachers from "@/hooks/use-teachers";
import TeacherCard from "../teacher-card";

const TeachersPage = () => {
    const navigate = useNavigate();

    const { data: teachers, isLoading } = useTeachers();

    if (isLoading || !teachers) {
        return null;
    }

    console.log(teachers);

    return (
        <div className="space-y-4 p-12 pt-6 h-[calc(100vh-4rem)]">
            <div className="flex items-center justify-between ">
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                    Teachers ({teachers.length})
                </h2>
                <Button onClick={() => navigate("new")}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add New Exam
                </Button>
            </div>
            <Separator />
            {teachers.length === 0 ? (
                <div className="flex flex-col gap-y-6 h-full items-center justify-center">
                    <MinusCircledIcon className="size-44 text-muted-foreground/20" />
                    <p className="text-muted-foreground text-lg">
                        There are no teachers yet.
                    </p>
                    <Button onClick={() => navigate("new")}>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Add New Teacher
                    </Button>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {teachers.map((teacher) => (
                        <TeacherCard teacher={teacher} key={teacher.id} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TeachersPage;
