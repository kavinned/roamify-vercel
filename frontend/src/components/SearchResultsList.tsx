import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import Loader from "./Loader";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export default function SearchResultsList() {
    const { results, status, error } = useAppSelector((state) => state.search);
    const navigate = useNavigate();

    const dedupResults = Array.from(
        new Set(results.map((result) => result.name))
    );

    function handleClick(cityName: string) {
        navigate(`/city?name=${cityName}`);
    }

    return (
        <>
            {error && (
                <p className="absolute top-2/3 text-red-500 font-semibold text-lg">
                    {error.message}
                </p>
            )}
            {status === "loading" && <Loader />}
            {results.length > 0 && (
                <Card className="p-4 md:w-2/3 w-full mt-6 bg-card border-muted-foreground/20 border drop-shadow-2xl shadow-xl">
                    <div className="space-y-3">
                        {dedupResults.map((cityName) => (
                            <Button
                                key={cityName}
                                variant="ghost"
                                className="w-full border-muted-foreground/30 border bg-primary-foreground/30"
                                onClick={() => handleClick(cityName)}
                            >
                                {cityName}
                            </Button>
                        ))}
                    </div>
                </Card>
            )}
        </>
    );
}
