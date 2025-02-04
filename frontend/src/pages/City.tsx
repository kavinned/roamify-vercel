import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { cityPlacesThunks, cityThunk } from "../store/thunks/cityThunk";
import Loader from "../components/Loader";
import PlacesList from "../components/PlacesList";
import HotelSearch from "../components/HotelSearch";
import HotelsList from "../components/HotelsList";
import DraftItineraryBtn from "../components/DraftItineraryBtn";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useCollapseText from "../hooks/useCollapseText";
import { Button } from "../components/ui/button";
import { motion } from "motion/react";
import { resetHotel } from "../store/reducers/hotelSlice";

export default function City() {
    const [searchParams] = useSearchParams();
    const { status, name, description, image, latlng, error } = useAppSelector(
        (state) => state.city
    );
    const {
        status: hotelStatus,
        hotels,
        error: hotelError,
    } = useAppSelector((state) => state.hotel);
    const { status: placesStatus, error: placesError } = useAppSelector(
        (state) => state.poi
    );
    const dispatch = useAppDispatch();
    const cityName = searchParams.get("name");
    const [lat, lng] = latlng
        ? latlng.replace(" ", "").split(",")
        : [null, null];

    useDocumentTitle(cityName as string);
    const { isExpanded, toggleText, textRef, showButton } = useCollapseText({
        status,
    });

    useEffect(() => {
        if (cityName) {
            dispatch(resetHotel());
            Promise.all([
                dispatch(cityThunk(cityName)),
                lat !== null &&
                    lng !== null &&
                    dispatch(cityPlacesThunks({ lat, lng })),
            ]);
        }
    }, [cityName, dispatch, lat, lng]);

    if (error.message)
        return (
            <div className="container error-msg">
                {error.status}: {error.message}
            </div>
        );

    return (
        <div className="relative">
            {status === "loading" || placesStatus === "loading" ? (
                <Loader />
            ) : (
                <>
                    <div className="h-fit flex md:flex-row-reverse flex-col-reverse items-center md:items-start md:justify-center mt-5">
                        <span className="p-3">
                            <h2 className="md:mt-12 w-full font-bold text-xl">
                                {name}
                            </h2>
                            <div className="text-toggle">
                                <p
                                    ref={textRef}
                                    className={
                                        isExpanded ? `expanded` : `collapsed`
                                    }
                                >
                                    {description}
                                </p>
                                {showButton && (
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{
                                            duration: 0.6,
                                            type: "spring",
                                        }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        <Button
                                            variant="default"
                                            className="w-fit h-fit p-2 text-xs my-2"
                                            onClick={toggleText}
                                        >
                                            {isExpanded
                                                ? "Show Less"
                                                : "Show More"}
                                        </Button>
                                    </motion.div>
                                )}
                            </div>
                        </span>
                        <img
                            src={image as string}
                            alt={name as string}
                            className="aspect-auto md:size-64 size-auto md:object-fit object-cover rounded-3xl mt-12 p-3"
                        />
                    </div>
                    <div className="flex w-full flex-col">
                        {placesError.message ? (
                            <div className="flex items-center justify-center w-full h-full p-10">
                                <p className="text-red-500 font-semibold text-lg">
                                    {error.message}
                                </p>
                            </div>
                        ) : (
                            <PlacesList />
                        )}
                        {hotelStatus === "succeeded" && hotels.length > 0 ? (
                            <HotelsList />
                        ) : hotelError.message ? (
                            <div className="flex items-center justify-center w-full h-full p-10">
                                <p className="text-red-500 font-semibold text-lg">
                                    {hotelError.message}
                                </p>
                            </div>
                        ) : (
                            <HotelSearch />
                        )}
                    </div>
                </>
            )}
            <DraftItineraryBtn />
        </div>
    );
}
