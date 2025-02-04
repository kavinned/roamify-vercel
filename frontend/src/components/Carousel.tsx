import { useRef } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({ children }: { children: React.ReactNode }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!scrollContainerRef.current) return;
        const scrollAmount = scrollContainerRef.current.clientWidth;
        scrollContainerRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "auto",
        });
    };

    return (
        <div className="relative group">
            <Button
                className="absolute left-1 top-1/2 -translate-y-1/2 z-10 rounded-full opacity-30 group-hover:opacity-70 transition-opacity"
                onClick={() => scroll("left")}
                size="icon"
                variant="outline"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-scroll w-full scroll-smooth gap-4"
                style={{ scrollbarWidth: "none" }}
            >
                {children}
                <Button
                    className="absolute right-1 top-1/2 -translate-y-1/2 z-10 rounded-full opacity-30 group-hover:opacity-70 transition-opacity"
                    onClick={() => scroll("right")}
                    size="icon"
                    variant="outline"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
