import { IPlayerInfo } from "../types/index";
import { PlayerInfo, Character } from "./index";
export declare class FetchUser {
    player: PlayerInfo;
    characters: Character[];
    ttl: number;
    constructor(language: string, data: {
        avatarInfoList: string[];
        playerInfo: IPlayerInfo;
        ttl: number;
    });
}
