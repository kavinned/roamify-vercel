import { useEffect, useState, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchItineraries } from "../store/thunks/itineraryThunk";
import { Itinerary } from "../models/Itinerary";
import { useParams, useNavigate } from "react-router-dom";
import ItineraryModal from "../components/ItineraryModal";
import useDocumentTitle from "../hooks/useDocumentTitle";
import ItineraryList from "../components/ItineraryList";

const UpcomingItineraries = () => {
    const dispatch = useAppDispatch();
    const { itineraries, status, error } = useAppSelector(
        (state) => state.itinerary
    );
    const [selectedItinerary, setSelectedItinerary] =
        useState<Itinerary | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchItineraries());
    }, [dispatch]);

    useDocumentTitle("Upcoming Itineraries");

    useEffect(() => {
        if (id) {
            const itinerary = itineraries?.find(
                (itinerary) => itinerary._id === id
            );
            setSelectedItinerary(itinerary || null);
            if (itinerary) {
                dialogRef.current?.showModal();
            }
        } else if (!id && selectedItinerary) {
            dialogRef.current?.close();
            navigate("/upcoming-trips");
        }
    }, [id, itineraries, navigate, selectedItinerary]);

    const upcomingItineraries = itineraries?.filter(
        (itinerary) => new Date(itinerary.startDate) > new Date()
    );

    function handleOpenModal(itinerary: Itinerary) {
        setSelectedItinerary((itinerary) => itinerary);
        navigate(`/upcoming-trips/${itinerary._id}`);
    }

    const handleCloseModal = useCallback(() => {
        dialogRef.current?.close();
        navigate("/upcoming-trips");
    }, [navigate]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dialogRef.current === event.target) handleCloseModal();
        }
        const dialog = dialogRef.current;
        dialog?.addEventListener("click", handleClickOutside);
        return () => {
            dialog?.removeEventListener("click", handleClickOutside);
        };
    }, [handleCloseModal]);

    if (error.message) {
        return (
            <div className="container error-msg">
                {error.status}: {error.message}
            </div>
        );
    }

    return (
        <>
            <ItineraryList
                itineraries={upcomingItineraries}
                status={status}
                title="Upcoming Itineraries"
                handleOpenModal={handleOpenModal}
            />
            <dialog
                ref={dialogRef}
                className="itinerary-modal backdrop:backdrop-blur-sm backdrop:backdrop-brightness-75 rounded-lg p-4 bg-popover text-popover-foreground md:w-2/5 h-max w-full"
            >
                {selectedItinerary && (
                    <ItineraryModal
                        selectedItinerary={selectedItinerary}
                        handleCloseModal={handleCloseModal}
                    />
                )}
            </dialog>
        </>
    );
};
export default UpcomingItineraries;
