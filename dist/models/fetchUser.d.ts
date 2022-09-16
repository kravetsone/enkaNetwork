import { IPlayerInfo } from "../types/index";
import { playerInfo } from "./playerInfo";
import { character } from "./character";
export declare class fetchUser {
    playerInfo: playerInfo;
    characters: character[];
    ttl: number;
    constructor(language: string, data: {
        avatarInfoList: string[];
        playerInfo: IPlayerInfo;
        ttl: number;
    });
}
