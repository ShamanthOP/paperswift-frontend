import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { MinusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import useSchemes from "@/hooks/use-schemes";
import SchemeCard from "../scheme-card";

const SchemesPage = () => {
    const navigate = useNavigate();

    const { data: schemes, isLoading } = useSchemes();

    if (isLoading || !schemes) {
        return null;
    }

    console.log(schemes);

    return (
        <div className="space-y-4 p-12 pt-6 h-[calc(100vh-4rem)]">
            <div className="flex items-center justify-between ">
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                    Schemes ({schemes.length})
                </h2>
                <Button onClick={() => navigate("new")}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add New Scheme
                </Button>
            </div>
            <Separator />
            {schemes.length === 0 ? (
                <div className="flex flex-col gap-y-6 h-full items-center justify-center">
                    <MinusCircledIcon className="size-44 text-muted-foreground/20" />
                    <p className="text-muted-foreground text-lg">
                        There are no schemes yet.
                    </p>
                    <Button onClick={() => navigate("new")}>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Create New Scheme
                    </Button>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {schemes.map((scheme) => (
                        <SchemeCard scheme={scheme} key={scheme.sid} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SchemesPage;
