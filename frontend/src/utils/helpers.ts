function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
}

export function debounce<T extends unknown[], U>(
    callback: (...args: T) => U,
    wait: number
) {
    let timer: NodeJS.Timeout;

    return (...args: T): void => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), wait);
    };
}

export { formatDate };
