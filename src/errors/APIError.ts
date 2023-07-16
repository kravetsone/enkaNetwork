const errors: { [key: string]: string } = {
    400: "Wrong UID format",
    404: "The player or profile does not exists",
    424: "Game maintenance or everything is broken after update",
    429: "Rate-limited",
    500: "General server error",
    503: "Service Unavailable",
};

export class APIError extends Error {
    status: number;

    constructor(status: number) {
        super();
        this.status = status;
        this.message = errors[status] || "An unknown error occurred";
    }
}
