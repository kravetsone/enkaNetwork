import { Axios } from "axios";
import { fetchUser } from "./models/fetchUser";
export declare class enkaNetwork {
    language: string;
    request: Axios;
    constructor(data: {
        language: string;
    });
    fetchUser(uid: number): Promise<fetchUser>;
}
