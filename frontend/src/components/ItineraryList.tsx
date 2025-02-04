import { Itinerary } from "../models/Itinerary";
import Loader from "./Loader";

interface Props {
    itineraries: Itinerary[] | undefined;
    status: "idle" | "loading" | "succeeded" | "failed";
    title: string;
    handleDelete?: (itineraryId: string) => void;
    handleOpenModal: (itinerary: Itinerary) => void;
}

export default function ItineraryList({
    itineraries,
    status,
    title,
    handleDelete,
    handleOpenModal,
}: Props) {
    return (
        <div className="mx-auto p-4 flex flex-col text-foreground">
            <h1 className="mt-16 text-3xl font-bold mb-4">{title}</h1>
            <div className="grid gap-4 lg:grid-cols-[repeat(auto-fit,_minmax(30vw,_1fr))]">
                {status === "loading" && <Loader />}
                {itineraries?.map((itinerary) => (
                    <div
                        key={itinerary._id}
                        className="rounded-md shadow-md p-4 flex items-center justify-between bg-card  border-border/50 border drop-shadow-md"
                    >
                        <div>
                            <h2 className="text-lg font-semibold">
                                {itinerary.name}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {itinerary.cityName}
                            </p>
                            <p className="text-xs text-muted-foreground/50">
                                {new Date(
                                    itinerary.startDate
                                ).toLocaleDateString()}{" "}
                                -{" "}
                                {new Date(
                                    itinerary.endDate
                                ).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleOpenModal(itinerary)}
                                className="bg-primary hover:bg-primary-foreground text-primary-foreground font-bold py-2 px-4 rounded"
                            >
                                View
                            </button>
                            {handleDelete && (
                                <button
                                    onClick={() =>
                                        handleDelete(itinerary._id as string)
                                    }
                                    className="bg-destructive hover:bg-destructive-foreground text-destructive-foreground font-bold py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
