export const parseCookies = (
    cookieHeader: string | undefined
): Record<string, string> => {
    if (!cookieHeader) return {};

    const cookies = cookieHeader.split("; ").map((cookie) => cookie.split("="));
    const cookieObject: Record<string, string> = Object.fromEntries(cookies);

    return cookieObject;
};
