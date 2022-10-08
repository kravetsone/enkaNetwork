import { IPlayerInfo } from "../types/index";
import { PlayerInfo, Character } from "./index";

export class FetchUserUID {
    player: PlayerInfo;
    characters: Character[];
    ttl: number;
    constructor(
        language: string,
        data: {
            avatarInfoList: string[];
            playerInfo: IPlayerInfo;
            ttl: number;
        }
    ) {
        this.player = new PlayerInfo(language, data.playerInfo);
        this.characters = data.avatarInfoList.map((avatar) => {
            return new Character(language, avatar);
        });
        this.ttl = data.ttl;
    }
}
