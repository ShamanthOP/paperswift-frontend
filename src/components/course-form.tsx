import { useState } from "react";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";
import toast from "react-hot-toast";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Form,
} from "./ui/form";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import axios from "axios";
import { useAuth } from "@/hooks/use-auth";
import { Course } from "@/lib/types";

interface CourseFormProps {
    initialData: Course | undefined;
}

const courseFormSchema = z.object({
    sem: z.string(),
    scheme: z.string(),
    syllabus_doc_url: z.string(),
    code: z.string(),
    name: z.string(),
    department: z.string(),
});

type CourseFormPayload = z.infer<typeof courseFormSchema>;

const CourseForm: React.FC<CourseFormProps> = ({ initialData }) => {
    const navigate = useNavigate();
    const { key } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const title = initialData ? "Edit Course" : "Create Course";
    const description = initialData ? "Edit the course" : "Add a new course";
    const toastMessage = initialData ? "Course updated" : "Course created";
    const action = initialData ? "Save changes" : "Create";

    const courseForm = useForm<CourseFormPayload>({
        resolver: zodResolver(courseFormSchema),
        defaultValues: {
            code: initialData?.code,
            syllabus_doc_url: initialData?.syllabus_doc_url,
            department: initialData?.department,
            name: initialData?.name,
            scheme: String(initialData?.scheme),
            sem: String(initialData?.sem),
        },
    });

    const onSubmit = async (data: CourseFormPayload) => {
        try {
            setIsLoading(true);
            if (initialData) {
                await axios.patch(
                    `${
                        import.meta.env.VITE_REACT_APP_BACKEND_URL
                    }/management/courses/${initialData.code}/`,
                    {
                        ...data,
                        sem: Number(data.sem),
                        scheme: Number(data.scheme),
                    },
                    {
                        headers: {
                            Authorization: `Token ${key}`,
                        },
                    }
                );
            } else {
                await axios.post(
                    `${
                        import.meta.env.VITE_REACT_APP_BACKEND_URL
                    }/management/courses/`,
                    {
                        ...data,
                        sem: Number(data.sem),
                        scheme: Number(data.scheme),
                    },
                    {
                        headers: {
                            Authorization: `Token ${key}`,
                        },
                    }
                );
            }
            toast.success(toastMessage);
            navigate(`/courses`);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(
                `${
                    import.meta.env.VITE_REACT_APP_BACKEND_URL
                }/management/courses/${initialData?.code}`,
                {
                    headers: {
                        Authorization: `Token ${key}`,
                    },
                }
            );
            navigate(`/courses`);
            toast.success(`Course deleted.`);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Please try again");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                        {title}
                    </h2>
                    <h6 className="scroll-m-20 text-base font-semibold tracking-tight">
                        {description}
                    </h6>
                </div>

                {initialData && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                disabled={isLoading}
                                variant={"destructive"}
                                size={"icon"}
                            >
                                <TrashIcon className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction asChild>
                                    <Button onClick={onDelete}>Continue</Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>
            <Separator />
            <Form {...courseForm}>
                <form
                    onSubmit={courseForm.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={courseForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Course name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={courseForm.control}
                            name="sem"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Semester</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Semester"
                                            {...field}
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={courseForm.control}
                            name="scheme"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Scheme</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Scheme"
                                            {...field}
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={courseForm.control}
                            name="department"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Department</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Department"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={courseForm.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Course Code"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={courseForm.control}
                            name="syllabus_doc_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Syllabus Document URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Document URL"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={isLoading}
                        className="ml-auto"
                        type="submit"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default CourseForm;
