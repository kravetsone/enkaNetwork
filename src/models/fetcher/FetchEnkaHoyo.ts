import { AssetsFinder } from "../../helpers";
import { IEnkaAccount, TLanguage } from "../../types";
import { PlayerInfo } from "../index";

export class FetchEnkaHoyo {
    uidPublic: boolean;
    public: boolean;
    verified: boolean;
    player: PlayerInfo;
    hash: string;
    region: string;
    order: number;

    constructor(assets: AssetsFinder, language: TLanguage, data: IEnkaAccount) {
        this.uidPublic = data.uid_public;
        this.public = data.public;
        this.verified = data.verified;
        this.player = new PlayerInfo(assets, language, data.player_info);
        this.hash = data.hash;
        this.region = data.region;
        this.order = data.order;
    }
}
