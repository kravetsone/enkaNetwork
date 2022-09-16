import { IPlayerInfo } from "../types/index";
import { playerInfo } from "./playerInfo";
import { character } from "./character";
export class fetchUser {
    playerInfo: playerInfo;
    characters: character[];
    ttl: number;
    constructor(language: string, data: {
        avatarInfoList: string[]; playerInfo: IPlayerInfo; ttl: number;
    }) {
        this.playerInfo = new playerInfo(language, data.playerInfo);
        this.characters = data.avatarInfoList.map(avatar => { return new character(language, avatar); });
        this.ttl = data.ttl;
    }
}