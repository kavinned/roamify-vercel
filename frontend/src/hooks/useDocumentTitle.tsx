import { useEffect } from "react";

export default function useDocumentTitle(title?: string) {
    useEffect(() => {
        if (!title) {
            document.title = "Roamify";
        } else {
            document.title = `${title} | Roamify`;
        }
    }, [title]);
}
