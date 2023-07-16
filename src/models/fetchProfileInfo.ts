import { IOwner, IPlayerInfo } from "../types";
import { PlayerInfo } from "./index";

export class FetchProfileInfo {
    player: PlayerInfo;
    ttl: number;
    constructor(
        language: string,
        data: {
            playerInfo: IPlayerInfo;
            ttl: number;
            owner?: IOwner;
        },
    ) {
        this.player = new PlayerInfo(language, data.playerInfo);
        this.ttl = data.ttl;
    }
}
