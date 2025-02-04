import { addHotel, addCity } from "../store/reducers/draftItinerarySlice";
import { Hotel, resetHotel } from "../store/reducers/hotelSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import AddToItineraryBtn from "./AddToItineraryBtn";
import Carousel from "./Carousel";
import Loader from "./Loader";
import { Button } from "./ui/button";

export default function HotelsList() {
    const { hotels, status } = useAppSelector((state) => state.hotel);
    const { isAuth } = useAppSelector((state) => state.auth);
    const { name, image } = useAppSelector((state) => state.city);
    const dispatch = useAppDispatch();

    function handleClick(
        event: React.MouseEvent<HTMLButtonElement>,
        hotel: Hotel
    ) {
        event.preventDefault();
        dispatch(addHotel(hotel));
        dispatch(addCity({ cityName: name, cityImage: image }));
    }

    return (
        <div className="flex flex-1 flex-col gap-2 p-4 h-fit overflow-x-hidden">
            {status === "loading" && <Loader />}
            <span className="flex justify-between px-3">
                <h2 className="text-3xl font-bold">Hotels</h2>
                <Button
                    className="w-fit h-fit p-2 text-xs font-semibold"
                    onClick={() => dispatch(resetHotel())}
                >
                    Reset
                </Button>
            </span>
            <Carousel>
                {hotels.map((hotel) => (
                    <div key={hotel.name} className="card my-1 max-h-fit">
                        <div className="flex h-2/5 justify-center items-center overflow-hidden rounded-xl drop-shadow-md shadow-md shadow-muted-foreground/30">
                            <img
                                className="min-w-full h-full rounded-xl object-cover"
                                src={hotel.image}
                                alt={hotel.name}
                            />
                            <div className="absolute bottom-3 right-3">
                                {isAuth && (
                                    <AddToItineraryBtn
                                        onClick={(event) =>
                                            handleClick(event, hotel)
                                        }
                                    />
                                )}
                            </div>
                        </div>
                        <span className="w-full h-2/5 flex flex-col gap-3 p-3">
                            <h3 className="card-header text-center pb-3 border-b-2 border-primary grid place-items-center">
                                {hotel.name}
                            </h3>
                            <span>
                                <p className="card-text">
                                    {hotel.stars}
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
                                <p className="card-text">{hotel.distance}</p>
                                <p className="card-text">
                                    {hotel.distanceFromPoi}
                                </p>
                                <p className="card-text">
                                    {hotel.pricePerNight}
                                </p>
                                <p className="card-text">
                                    {hotel.cheapestPartner}
                                </p>
                            </span>
                        </span>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
