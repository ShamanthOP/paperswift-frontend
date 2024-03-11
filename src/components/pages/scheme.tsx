import { useParams } from "react-router-dom";
import useSchemes from "@/hooks/use-schemes";
import SchemeForm from "../scheme-form";

const SchemePage = () => {
    const { data: schemes, isLoading } = useSchemes();
    const params = useParams();

    if (isLoading) {
        return null;
    }

    return (
        <div className="space-y-4 p-12 pt-6 h-[calc(100vh-4rem)]">
            <SchemeForm
                initialData={schemes?.find(
                    (scheme) => String(scheme.sid) === params.sid
                )}
            />
        </div>
    );
};

export default SchemePage;
