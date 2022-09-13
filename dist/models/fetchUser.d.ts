import { IPlayerInfo } from "../types/index";
import { playerInfo } from "./playerInfo";
import { character } from "./character";
export declare class fetchUser {
    playerInfo: playerInfo;
    characters: character[];
    constructor(language: string, data: {
        avatarInfoList: string[];
        playerInfo: IPlayerInfo;
    });
}
