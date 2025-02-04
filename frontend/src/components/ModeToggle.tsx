import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeProvider";
import { MoonStar, Sun } from "lucide-react";

export default function ModeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
            }}
        >
            {theme === "dark" ? <Sun /> : <MoonStar />}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
