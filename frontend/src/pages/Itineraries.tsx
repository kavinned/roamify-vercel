import { useEffect, useState, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
    fetchItineraries,
    deleteItinerary,
} from "../store/thunks/itineraryThunk";
import { Itinerary } from "../models/Itinerary";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import ItineraryModal from "../components/ItineraryModal";
import useDocumentTitle from "../hooks/useDocumentTitle";
import ItineraryList from "../components/ItineraryList";

const Itineraries = () => {
    const dispatch = useAppDispatch();
    const { itineraries, status, error } = useAppSelector(
        (state) => state.itinerary
    );
    const [selectedItinerary, setSelectedItinerary] =
        useState<Itinerary | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const newItineraryId = searchParams.get("id");

    useEffect(() => {
        dispatch(fetchItineraries());
    }, [dispatch]);

    useDocumentTitle("Itineraries");

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
            navigate("/itineraries");
        }
    }, [id, itineraries, navigate, selectedItinerary]);

    useEffect(() => {
        if (newItineraryId) {
            const itinerary = itineraries?.find(
                (itinerary) => itinerary._id === newItineraryId
            );
            if (itinerary) {
                setSelectedItinerary((itinerary) => itinerary);
                navigate(`/itineraries/${newItineraryId}`);
            }
        }
    }, [itineraries, navigate, newItineraryId]);

    function handleDelete(itineraryId: string) {
        dispatch(deleteItinerary(itineraryId));
    }

    function handleOpenModal(itinerary: Itinerary) {
        setSelectedItinerary((itinerary) => itinerary);
        navigate(`/itineraries/${itinerary._id}`);
    }

    const handleCloseModal = useCallback(() => {
        dialogRef.current?.close();
        navigate("/itineraries");
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
                itineraries={itineraries}
                status={status}
                title="Itineraries"
                handleDelete={handleDelete}
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
export default Itineraries;
