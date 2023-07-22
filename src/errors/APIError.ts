const errors: Record<string, string> = {
    400: "Wrong UID format",
    404: "The player or enkaProfile does not exists",
    424: "Game maintenance or everything is broken after update",
    429: "Rate-limited",
    500: "General server error",
    503: "Service Unavailable",
}; //TODO: rewrite to enum

export class APIError extends Error {
    status: number;

    constructor(status: number) {
        super();
        this.status = status;
        this.message = errors[status] || "An unknown error occurred";
    }
}
