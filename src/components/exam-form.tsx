import { Exam } from "@/lib/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { CalendarIcon, TrashIcon } from "@radix-ui/react-icons";
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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { Switch } from "./ui/switch";
import axios from "axios";
import { useAuth } from "@/hooks/use-auth";

interface ExamFormProps {
    initialData: Exam | undefined;
}

const examFormSchema = z.object({
    sem: z.string(),
    scheme: z.string(),
    paper_submission_deadline: z.date(),
    is_supplementary: z.boolean(),
});

type ExamFormPayload = z.infer<typeof examFormSchema>;

const ExamForm: React.FC<ExamFormProps> = ({ initialData }) => {
    const navigate = useNavigate();
    const { key } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const title = initialData ? "Edit Exam" : "Create Exam";
    const description = initialData ? "Edit the exam" : "Add a new exam";
    const toastMessage = initialData ? "Exam updated" : "Exam created";
    const action = initialData ? "Save changes" : "Create";

    const examForm = useForm<ExamFormPayload>({
        resolver: zodResolver(examFormSchema),
        defaultValues: {
            is_supplementary: initialData?.is_supplementary ?? false,
            paper_submission_deadline: initialData?.paper_submission_deadline,
            scheme: String(initialData?.scheme),
            sem: String(initialData?.sem),
        },
    });

    const onSubmit = async (data: ExamFormPayload) => {
        try {
            setIsLoading(true);
            if (initialData) {
                await axios.patch(
                    `${
                        import.meta.env.VITE_REACT_APP_BACKEND_URL
                    }/management/exams/${initialData.eid}/`,
                    {
                        sem: Number(data.sem),
                        scheme: Number(data.scheme),
                        paper_submission_deadline:
                            data.paper_submission_deadline
                                .toISOString()
                                .split("T")[0],
                        is_supplementary: data.is_supplementary,
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
                    }/management/exams/`,
                    {
                        sem: Number(data.sem),
                        scheme: Number(data.scheme),
                        paper_submission_deadline:
                            data.paper_submission_deadline
                                .toISOString()
                                .split("T")[0],
                        is_supplementary: data.is_supplementary,
                    },
                    {
                        headers: {
                            Authorization: `Token ${key}`,
                        },
                    }
                );
            }
            toast.success(toastMessage);
            navigate(`/exams`);
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
                }/management/exams/${initialData?.eid}`,
                {
                    headers: {
                        Authorization: `Token ${key}`,
                    },
                }
            );
            navigate(`/exams`);
            toast.success(`Exam deleted.`);
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
            <Form {...examForm}>
                <form
                    onSubmit={examForm.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={examForm.control}
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
                            control={examForm.control}
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
                            control={examForm.control}
                            name="is_supplementary"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>
                                            Supplementary exam
                                        </FormLabel>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={examForm.control}
                            name="paper_submission_deadline"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Submission deadline</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            "PPP"
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
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

export default ExamForm;
