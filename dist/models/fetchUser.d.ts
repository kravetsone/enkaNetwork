import { playerInfo } from "./playerInfo";
export declare class fetchUser {
    playerInfo: playerInfo;
    avatarInfoList: string[];
    constructor(language: string, data: {
        avatarInfoList: string[];
        playerInfo: playerInfo;
    });
}
