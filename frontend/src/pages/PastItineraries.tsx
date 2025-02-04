import { useEffect, useState, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchItineraries } from "../store/thunks/itineraryThunk";
import { Itinerary } from "../models/Itinerary";
import { useNavigate, useParams } from "react-router-dom";
import ItineraryModal from "../components/ItineraryModal";
import useDocumentTitle from "../hooks/useDocumentTitle";
import ItineraryList from "../components/ItineraryList";

const PastItineraries = () => {
    const dispatch = useAppDispatch();
    const { itineraries, status, error } = useAppSelector(
        (state) => state.itinerary
    );
    const navigate = useNavigate();
    const [selectedItinerary, setSelectedItinerary] =
        useState<Itinerary | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchItineraries());
    }, [dispatch]);

    useDocumentTitle("Past Itineraries");

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
            navigate("/past-trips");
        }
    }, [id, itineraries, navigate, selectedItinerary]);

    const pastItineraries = itineraries?.filter(
        (itinerary) => new Date(itinerary.startDate) <= new Date()
    );

    function handleOpenModal(itinerary: Itinerary) {
        setSelectedItinerary((itinerary) => itinerary);
        navigate(`/past-trips/${itinerary._id}`);
    }

    const handleCloseModal = useCallback(() => {
        dialogRef.current?.close();
        navigate("/past-trips");
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
                itineraries={pastItineraries}
                status={status}
                title="Past Itineraries"
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

export default PastItineraries;
