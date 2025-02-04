import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import { FaChevronCircleLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function DraftItineraryBtn() {
    const [show, setShow] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const { isAuth } = useAppSelector((state) => state.auth);
    const { pointsOfInterest, hotel } = useAppSelector((state) => state.draft);

    useEffect(() => {
        const hasDraftContent = pointsOfInterest.length > 0 || !!hotel;
        const shouldShow = isAuth && hasDraftContent;
        setShow(shouldShow);
        setExpanded(shouldShow);
    }, [isAuth, pointsOfInterest, hotel]);

    useEffect(() => {
        if (show && window.innerWidth >= 768 && expanded) {
            const timer = setTimeout(() => setExpanded(false), 3000);
            return () => clearTimeout(timer); // Cleanup the timer
        }
    }, [show, expanded]);

    useEffect(() => {
        const handleResize = () => {
            setExpanded(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <motion.div
            className="fixed bottom-4 right-4 z-50"
            initial={{ x: 500, opacity: 0 }}
            animate={show && { x: 0, opacity: 1 }}
            transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15,
                ease: "easeInOut",
                bounce: 0.3,
            }}
        >
            <Button
                asChild
                variant="secondary"
                className={`draft-itinerary-btn opacity-85 hover:opacity-100 max-h-10 min-h-10 overflow-hidden transition-all duration-200 ease-in-out text-nowrap justify-center ${
                    show ? "block" : "hidden"
                } ${expanded ? "w-48" : "w-10"}`}
                onMouseEnter={() => setExpanded(true)}
                onMouseLeave={() => {
                    if (window.innerWidth >= 768) {
                        setTimeout(() => setExpanded(false), 300);
                    }
                }}
                aria-label="View Draft Itinerary"
            >
                <NavLink
                    to="/itinerary/draft"
                    className="flex items-center gap-2"
                >
                    {expanded ? (
                        "View Draft Itinerary"
                    ) : (
                        <FaChevronCircleLeft className="h-5 w-5" />
                    )}
                </NavLink>
            </Button>
        </motion.div>
    );
}
