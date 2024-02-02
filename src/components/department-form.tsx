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
import { Department } from "@/lib/types";

interface DepartmentFormProps {
    initialData: Department | undefined;
}

const departmentFormSchema = z.object({
    code: z.string(),
    name: z.string(),
    hod: z.string(),
});

type DepartmentFormPayload = z.infer<typeof departmentFormSchema>;

const DepartmentForm: React.FC<DepartmentFormProps> = ({ initialData }) => {
    const navigate = useNavigate();
    const { key } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const title = initialData ? "Edit Department" : "Create Department";
    const description = initialData
        ? "Edit the department"
        : "Add a new department";
    const toastMessage = initialData
        ? "Department updated"
        : "Department created";
    const action = initialData ? "Save changes" : "Create";

    const departmentForm = useForm<DepartmentFormPayload>({
        resolver: zodResolver(departmentFormSchema),
        defaultValues: {
            code: initialData?.code,
            hod: String(initialData?.hod),
        },
    });

    const onSubmit = async (data: DepartmentFormPayload) => {
        try {
            setIsLoading(true);
            if (initialData) {
                await axios.patch(
                    `${
                        import.meta.env.VITE_REACT_APP_BACKEND_URL
                    }/management/departments/${initialData.code}/`,
                    {
                        ...data,
                        hod: Number(data.hod),
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
                    }/management/departments/`,
                    {
                        ...data,
                        hod: Number(data.hod),
                    },
                    {
                        headers: {
                            Authorization: `Token ${key}`,
                        },
                    }
                );
            }
            toast.success(toastMessage);
            navigate(`/departments`);
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
                }/management/departments/${initialData?.code}`,
                {
                    headers: {
                        Authorization: `Token ${key}`,
                    },
                }
            );
            navigate(`/departments`);
            toast.success(`Department deleted.`);
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
            <Form {...departmentForm}>
                <form
                    onSubmit={departmentForm.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={departmentForm.control}
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
                            control={departmentForm.control}
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
                            control={departmentForm.control}
                            name="hod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Head of department</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="hod"
                                            {...field}
                                            type="number"
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

export default DepartmentForm;
