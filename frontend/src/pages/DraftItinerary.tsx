import useDocumentTitle from "../hooks/useDocumentTitle";
import { Itinerary } from "../models/Itinerary";
import {
    draftItinerary,
    resetItinerary,
} from "../store/reducers/draftItinerarySlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { createItinerary } from "../store/thunks/itineraryThunk";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Hotel } from "../store/reducers/hotelSlice";

export default function DraftItinerary() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const draftItineraryData: draftItinerary = JSON.parse(
        localStorage.getItem("draftItinerary") || "{}"
    );
    const { status, error } = useAppSelector((state) => state.itinerary);
    const {
        endDate,
        hotel,
        name,
        pointsOfInterest,
        startDate,
        cityName,
        cityImage,
    } = draftItineraryData;

    useDocumentTitle(`${cityName} - Draft`);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formValues = Object.fromEntries(formData);
        const itineraryData: Itinerary = {
            name: formValues.name as string,
            startDate: new Date(formValues.startDate as string),
            endDate: new Date(formValues.endDate as string),
            pointsOfInterest: pointsOfInterest,
            hotel: hotel as Hotel,
            cityName: cityName,
            cityImage: cityImage,
        };
        const response = await dispatch(createItinerary(itineraryData));
        if (status === "succeeded" && response.payload._id)
            navigate(`/itineraries?id=${response.payload._id}`);
        dispatch(resetItinerary());
    }

    return (
        <div className="md:flex justify-center items-center h-screen mt-16 md:mt-0 transition-all duration-300">
            <form
                className="draft-form w-full xl:w-3/4 p-10"
                onSubmit={handleSubmit}
            >
                <div className="md:grid md:grid-cols-3 md:gap-6 flex flex-col gap-3 w-full h-full">
                    <Card className="flex flex-col gap-3 p-6 shadow-lg shadow-muted-foreground/5 drop-shadow-xl">
                        <div className="flex flex-col items-center gap-3">
                            <h2>{cityName}</h2>
                            <img
                                src={cityImage}
                                alt={cityName}
                                className="w-32 h-32 object-cover rounded-full"
                            />
                        </div>
                        <div className="form-span">
                            <Label htmlFor="name">Name:</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                defaultValue={name}
                                required
                            />
                        </div>
                        <div className="form-span">
                            <Label htmlFor="startDate">Start Date:</Label>
                            <Input
                                className="flex justify-center text-center"
                                type="date"
                                name="startDate"
                                id="startDate"
                                defaultValue={startDate}
                                required
                            />
                        </div>
                        <div className="form-span">
                            <Label htmlFor="endDate">End Date:</Label>
                            <Input
                                className="flex justify-center text-center"
                                type="date"
                                name="endDate"
                                id="endDate"
                                defaultValue={endDate}
                                required
                            />
                        </div>
                    </Card>
                    <Card className="flex flex-col gap-3 p-4 shadow-lg shadow-muted-foreground/5 drop-shadow-xl">
                        <Label>Hotel:</Label>
                        {hotel ? (
                            <div className="flex flex-col gap-2">
                                <img
                                    src={hotel.image}
                                    alt={hotel.name}
                                    className="hotel-img rounded-lg object-cover min-w-full h-48"
                                />
                                <p>
                                    <strong>Name:</strong> {hotel.name}
                                </p>
                                <p>
                                    <strong>Stars:</strong> {hotel.stars}
                                    <span
                                        style={{
                                            WebkitTextStroke:
                                                "1px rgba(0,0,0,0.45)",
                                        }}
                                        className="text-yellow-300 text-xl ml-1"
                                    >
                                        ★
                                    </span>
                                </p>
                                <p>
                                    <strong>Distance:</strong> {hotel.distance}
                                </p>
                                <p>
                                    <strong>Distance From Poi:</strong>{" "}
                                    {hotel.distanceFromPoi}
                                </p>
                                <p>
                                    <strong>Price Per Night:</strong>{" "}
                                    {hotel.pricePerNight}
                                </p>
                                <p>
                                    <strong>Cheapest Partner:</strong>{" "}
                                    {hotel.cheapestPartner}
                                </p>
                            </div>
                        ) : (
                            <p>No Hotel Chosen.</p>
                        )}
                    </Card>
                    <Card className="flex flex-col gap-3 p-4 px-6 shadow-lg shadow-muted-foreground/5 drop-shadow-xl">
                        <Label>Points of Interest:</Label>
                        {pointsOfInterest.map((p, index) => (
                            <details key={index}>
                                <summary>{p.name}</summary>
                                <div>
                                    <p>
                                        <strong>Address:</strong> {p.address}
                                    </p>
                                    {p.phone && (
                                        <p>
                                            <strong>Phone:</strong> {p.phone}
                                        </p>
                                    )}
                                    <p>
                                        <strong>Types:</strong>{" "}
                                        {p.types.join(", ")}
                                    </p>
                                    {p.site && (
                                        <a
                                            target="_blank"
                                            rel="noreferrer"
                                            href={p.site}
                                            className="underline font-bold leading-3 text-teal-600 hover:text-teal-800"
                                        >
                                            Website
                                        </a>
                                    )}
                                </div>
                            </details>
                        ))}
                    </Card>
                </div>
                <Button
                    className="w-1/3 max-w-64 self-center mt-5"
                    type="submit"
                >
                    Submit
                </Button>
                {error.message && (
                    <p className="text-red-500">{error.message}</p>
                )}
            </form>
        </div>
    );
}
