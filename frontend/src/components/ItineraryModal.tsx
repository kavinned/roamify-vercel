import { Itinerary } from "../models/Itinerary";
import { AiFillCloseCircle } from "react-icons/ai";
import { useAppSelector } from "../store/store";

interface Props {
    selectedItinerary: Itinerary;
    handleCloseModal: () => void;
}

export default function ItineraryModal({
    selectedItinerary,
    handleCloseModal,
}: Props) {
    const { error } = useAppSelector((state) => state.itinerary);

    return (
        <div className="rounded-lg shadow-md bg-card text-foreground p-6">
            {error && (
                <div className="text-red-500 flex w-full h-full">
                    <p className="text-lg font-semibold text-red-500">
                        {error.message}
                    </p>
                </div>
            )}
            {selectedItinerary && (
                <div className="h-fit">
                    <div className="pb-4 mb-4 border-b border-border">
                        <div className="flex justify-between items-center border-b border-border pb-4">
                            <h2 className="text-xl font-bold">
                                {selectedItinerary?.name}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="hover:opacity-75"
                            >
                                <AiFillCloseCircle size={24} />
                            </button>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-4">
                            <h3 className="text-lg font-semibold">
                                {selectedItinerary.cityName}
                            </h3>
                            <img
                                src={selectedItinerary.cityImage}
                                alt={selectedItinerary.cityName}
                                className="w-24 h-24 object-cover rounded-full shadow-md"
                            />
                        </div>
                    </div>
                    <div className="pb-4 mb-4 border-b border-border">
                        <p>
                            Start Date:{" "}
                            {new Date(
                                selectedItinerary.startDate
                            ).toLocaleDateString()}
                        </p>
                        <p>
                            End Date:{" "}
                            {new Date(
                                selectedItinerary.endDate
                            ).toLocaleDateString()}
                        </p>
                    </div>
                    <details className="mb-4 pb-4 border-b border-border">
                        <summary className="font-semibold">Hotel</summary>
                        <p>{selectedItinerary.hotel.name}</p>
                        <p>{selectedItinerary.hotel.distance}</p>
                        <p>{selectedItinerary.hotel.pricePerNight}</p>
                        <p>{selectedItinerary.hotel.stars} Stars</p>
                    </details>
                    <details>
                        <summary className="mb-2 font-semibold">
                            Points of Interest
                        </summary>
                        <div>
                            {selectedItinerary.pointsOfInterest.map((poi) => (
                                <details key={poi.site} className="ml-2">
                                    <summary>{poi.name}</summary>
                                    <p>{poi.address}</p>
                                    {poi.phone && <p>{poi.phone}</p>}
                                    <p>{poi.types.join(", ")}</p>
                                    {poi.site && (
                                        <a
                                            className="underline"
                                            href={poi.site}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Website
                                        </a>
                                    )}
                                </details>
                            ))}
                        </div>
                    </details>
                </div>
            )}
        </div>
    );
}
