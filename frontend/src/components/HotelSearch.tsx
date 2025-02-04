import { addDates } from "../store/reducers/draftItinerarySlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { hotelThunk } from "../store/thunks/cityThunk";
import SmallLoader from "./SmallLoader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function HotelSearch() {
    const { entityId } = useAppSelector((state) => state.city);
    const { status } = useAppSelector((state) => state.hotel);
    const dispatch = useAppDispatch();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formObject = Object.fromEntries(formData);
        const checkInDate = formObject.checkinDate as string;
        const checkOutDate = formObject.checkoutDate as string;
        dispatch(addDates({ startDate: checkInDate, endDate: checkOutDate }));
        if (entityId)
            dispatch(hotelThunk({ entityId, checkInDate, checkOutDate }));
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="hotel-search-form flex flex-1 justify-center items-center border-0 w-full h-full p-5"
        >
            <div className="flex md:flex-row flex-col items-center h-full justify-center md:gap-5 gap-2 mb-5">
                {status === "loading" ? (
                    <div>
                        <SmallLoader classes="w-full p-8" />
                        <p className="animate-pulse">Loading Hotels...</p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-3xl font-bold">
                            Search for a Hotel
                        </h2>

                        <span className="flex flex-col gap-2 mb-4">
                            <Label htmlFor="checkin-date">Check In</Label>
                            <Input
                                type="date"
                                name="checkinDate"
                                id="checkin-date"
                                required
                            />
                        </span>
                        <span className="flex flex-col gap-2 mb-4">
                            <Label htmlFor="checkout-date">Check Out</Label>
                            <Input
                                type="date"
                                name="checkoutDate"
                                id="checkout-date"
                                required
                            />
                        </span>

                        <span className="flex items-center justify-center h-full">
                            <Button type="submit">Search</Button>
                        </span>
                    </>
                )}
            </div>
        </form>
    );
}
