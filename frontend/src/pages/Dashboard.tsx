import useDocumentTitle from "../hooks/useDocumentTitle";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import { fetchItineraries } from "../store/thunks/itineraryThunk";
import { ArchiveIcon, LucideEarth } from "lucide-react";
import { BentoCard, BentoGrid } from "../components/ui/bento-grid";
import { Card, CardContent } from "../components/ui/card";
import Loader from "../components/Loader";

export default function Dashboard() {
    useDocumentTitle("Dashboard");
    const { itineraries, status, error } = useAppSelector(
        (state) => state.itinerary
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchItineraries());
    }, [dispatch]);

    const upcomingTripsCount = itineraries?.filter(
        (itinerary) => new Date(itinerary.startDate) > new Date()
    ).length;

    const pastTripsCount = itineraries?.filter(
        (itinerary) => new Date(itinerary.startDate) <= new Date()
    ).length;

    if (error.message) {
        return (
            <div className="container error-msg">
                {error.status}: {error.message}
            </div>
        );
    }

    return (
        <div className="container h-screen max-w-screen p-4 flex flex-col gap-4">
            {status === "loading" && <Loader />}
            <h1 className="mt-16 text-4xl font-bold w-3/4 text-left">
                Dashboard
            </h1>
            <BentoGrid className="h-3/4 w-3/4 grid-rows-5 md:grid-cols-2">
                <BentoCard
                    name="Upcoming Trips"
                    description="View your next adventures."
                    Icon={LucideEarth}
                    href="/upcoming-trips"
                    cta="View"
                    className="lg:row-start-1 lg:row-end-6 row-start-1 row-end-3 lg:col-start-1 lg:col-end-2"
                    background={
                        <div className="w-full h-full">
                            <p
                                className="text-5xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 mix-blend-plus-darker"
                                style={{
                                    textShadow: "0 0 20px seagreen",
                                }}
                            >
                                {upcomingTripsCount}
                            </p>
                            <img
                                className="absolute object-cover z-0 h-full w-full opacity-30 dark:mix-blend-hard-light"
                                src="assets/upcoming-image.jpg"
                            />
                        </div>
                    }
                />
                <BentoCard
                    name="Past Trips"
                    description="Relive your past adventures."
                    Icon={ArchiveIcon}
                    href="/past-trips"
                    cta="View"
                    className="lg:row-start-1 lg:row-end-5 row-start-3 row-end-5 lg:col-start-2 lg:col-end-2"
                    background={
                        <div className="w-full h-full">
                            <p
                                className="text-5xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                style={{
                                    textShadow: "0 0 10px gray",
                                }}
                            >
                                {pastTripsCount}
                            </p>
                            <img
                                className="absolute object-cover z-0 h-full w-full opacity-30 dark:mix-blend-hard-light"
                                src="assets/past-image.jpg"
                            />
                        </div>
                    }
                />
                <Card className="row-start-5 row-end-6 lg:col-start-2 lg:col-end-2 col-start-1 col-end-4 bg-muted/30 shadow-xl drop-shadow-sm border light:border-gray-300/50">
                    <CardContent className="flex flex-col justify-center items-center w-full h-full p-0">
                        <h2 className="text-2xl font-semibold">Total Trips</h2>
                        <p
                            className="text-xl font-bold"
                            style={{
                                textShadow: "0 0 10px gold",
                            }}
                        >
                            {itineraries?.length}
                        </p>
                    </CardContent>
                </Card>
            </BentoGrid>
        </div>
    );
}