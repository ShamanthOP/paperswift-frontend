import { useParams } from "react-router-dom";
import useDegrees from "@/hooks/use-degrees";
import DegreeForm from "../degree-form";

const DegreePage = () => {
    const { data: degrees, isLoading } = useDegrees();
    const params = useParams();

    if (isLoading) {
        return null;
    }

    return (
        <div className="space-y-4 p-12 pt-6 h-[calc(100vh-4rem)]">
            <DegreeForm
                initialData={degrees?.find(
                    (degree) => degree.code === params.code
                )}
            />
        </div>
    );
};

export default DegreePage;
