import { IPlayerInfo } from "../types/index";
import { playerInfo } from "./playerInfo";
import { character } from "./character";
export class fetchUser {
    playerInfo: playerInfo;
    characters: character[];
    constructor(language: string, data: {
        avatarInfoList: string[]; playerInfo: IPlayerInfo
    }) {
        this.playerInfo = new playerInfo(language, data.playerInfo);
        this.characters = data.avatarInfoList.map(avatar => { return new character(language, avatar); });
    }
}