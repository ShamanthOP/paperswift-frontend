import { Teacher } from "@/lib/types";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

interface TeacherFormProps {
    initialData: Teacher | undefined;
}

const teacherFormSchema = z.object({
    id: z.string(),
    name: z.string(),
    is_external: z.boolean(),
    gender: z.string(),
    dob: z.date(),
    mobile_no: z.string(),
    address: z.string(),
    designation: z.string(),
    qualification: z.string(),
    bank_account_no: z.string(),
    bank_ifsc: z.string(),
    bank_name: z.string(),
    pan_no: z.string(),
    user: z.string(),
});

type TeacherFormPayload = z.infer<typeof teacherFormSchema>;

const TeacherForm: React.FC<TeacherFormProps> = ({ initialData }) => {
    const navigate = useNavigate();
    const { key } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const title = initialData ? "Edit Teacher" : "Create Teacher";
    const description = initialData ? "Edit the teacher" : "Add a new teacher";
    const toastMessage = initialData ? "Teacher updated" : "Teacher created";
    const action = initialData ? "Save changes" : "Create";

    const teacherForm = useForm<TeacherFormPayload>({
        resolver: zodResolver(teacherFormSchema),
        defaultValues: {
            is_external: initialData?.is_external ?? false,
            name: initialData?.name,
            gender: initialData?.gender,
            dob: initialData?.dob,
            pan_no: initialData?.pan_no,
            mobile_no: initialData?.mobile_no,
            address: initialData?.address,
            designation: initialData?.designation,
            qualification: initialData?.qualification,
            bank_account_no: initialData?.bank_account_no,
            bank_ifsc: initialData?.bank_ifsc,
            bank_name: initialData?.bank_name,
            id: String(initialData?.id),
            user: String(initialData?.user),
        },
    });

    const onSubmit = async (data: TeacherFormPayload) => {
        try {
            setIsLoading(true);
            if (initialData) {
                await axios.patch(
                    `${
                        import.meta.env.VITE_REACT_APP_BACKEND_URL
                    }/management/teachers/${initialData.id}/`,
                    {
                        ...data,
                        id: Number(data.id),
                        user: Number(data.user),
                        dob: data.dob.toISOString().split("T")[0],
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
                    }/management/teachers/`,
                    {
                        ...data,
                        user: Number(data.user),
                        dob: data.dob.toISOString().split("T")[0],
                    },
                    {
                        headers: {
                            Authorization: `Token ${key}`,
                        },
                    }
                );
            }
            toast.success(toastMessage);
            navigate(`/teachers`);
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
                }/management/teachers/${initialData?.id}`,
                {
                    headers: {
                        Authorization: `Token ${key}`,
                    },
                }
            );
            navigate(`/teachers`);
            toast.success(`Teacher deleted.`);
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
            <Form {...teacherForm}>
                <form
                    onSubmit={teacherForm.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={teacherForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Teacher name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={teacherForm.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a gender" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="M">
                                                Male
                                            </SelectItem>
                                            <SelectItem value="F">
                                                Female
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={teacherForm.control}
                            name="is_external"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Is External?</FormLabel>
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
                            control={teacherForm.control}
                            name="designation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Designation</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Designation"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={teacherForm.control}
                            name="qualification"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Qualification</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Qualification"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={teacherForm.control}
                            name="mobile_no"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mobile number</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Mobile number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={teacherForm.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Address"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={teacherForm.control}
                            name="pan_no"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pan number</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Pan number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={teacherForm.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date of birth</FormLabel>
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
                        <FormField
                            control={teacherForm.control}
                            name="bank_account_no"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bank Account Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Bank Account Number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={teacherForm.control}
                            name="bank_ifsc"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bank IFSC Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="IFSC Code"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={teacherForm.control}
                            name="bank_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bank Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Bank name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={teacherForm.control}
                            name="user"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User</FormLabel>
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

export default TeacherForm;
