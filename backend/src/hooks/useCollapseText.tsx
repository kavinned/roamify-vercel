import { useEffect, useRef, useState } from "react";

export default function useCollapseText({ status }: { status: string }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    function checkShowButton() {
        if (textRef.current) {
            textRef.current.style.setProperty(
                "--scroll-height",
                `${textRef.current.scrollHeight}px`
            );
            setShowButton(
                textRef.current.scrollHeight !== textRef.current.clientHeight
            );
        }
    }

    useEffect(() => {
        if (status === "succeeded") {
            setIsExpanded(false);
            checkShowButton();
            const timer = setTimeout(checkShowButton, 1000);

            const handleResize = () => checkShowButton();
            window.addEventListener("resize", handleResize);

            return () => {
                clearTimeout(timer);
                window.removeEventListener("resize", handleResize);
            };
        }
    }, [status, textRef, windowWidth, windowHeight]);



    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };

    return {
        isExpanded,
        toggleText,
        textRef,
        showButton,
    };
}
