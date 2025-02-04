import { Button } from "./ui/button";

interface Props {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
}

export default function AddToItineraryBtn({
    onClick,
    variant = "default",
}: Props) {
    return (
        <Button
            variant={variant}
            className="w-fit h-fit p-2 text-xs"
            onClick={onClick}
        >
            Add To Itinerary
        </Button>
    );
}
