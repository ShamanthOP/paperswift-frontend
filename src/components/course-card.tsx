import { Course } from "@/lib/types";
import { Card, CardContent } from "./ui/card";
import React from "react";
import { Badge } from "./ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
    DotsVerticalIcon,
    Pencil1Icon,
    TrashIcon,
} from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
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
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/use-auth";

interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const navigate = useNavigate();
    const { key } = useAuth();

    const onDelete = async () => {
        try {
            await axios.delete(
                `${
                    import.meta.env.VITE_REACT_APP_BACKEND_URL
                }/management/courses/${course.code}`,
                {
                    headers: {
                        Authorization: `Token ${key}`,
                    },
                }
            );
            navigate(0);
            toast.success(`Course deleted.`);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Please try again");
        }
    };

    return (
        <Card>
            <CardContent className="py-4 flex flex-col gap-y-2">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Badge>{course.department}</Badge>
                        <Badge>{course.code}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="border rounded-md px-3 py-1 font-bold">
                            Sem: {course.sem}
                        </p>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className="h-8 w-8 p-0"
                                >
                                    <span className="sr-only">Open menu</span>
                                    <DotsVerticalIcon className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => navigate(`${course.code}`)}
                                >
                                    <Pencil1Icon className="mr-2 h-4 w-4" />
                                    Update
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <AlertDialog>
                                        <AlertDialogTrigger className="w-full flex items-center p-2 text-sm hover:bg-muted">
                                            <TrashIcon className=" mr-2 h-4 w-4" />
                                            Delete
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Are you absolutely sure?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be
                                                    undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction asChild>
                                                    <Button onClick={onDelete}>
                                                        Continue
                                                    </Button>
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0">
                    {course.name}
                </h2>
                <div className="flex items-center justify-between gap-2">
                    <a
                        href={course.syllabus_doc_url}
                        className="underline underline-offset-2 text-sm text-muted-foreground"
                    >
                        Syllabus Document
                    </a>
                    <p className="text-muted-foreground text-sm">
                        Scheme {course.scheme}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default CourseCard;
