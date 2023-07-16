import { PlayerInfo } from "./index";

export class FetchProfileAccount {
    uidPublic: boolean;
    public: boolean;
    verified: boolean;
    player: PlayerInfo;
    hash: string;
    region: string;
    order: number;

    constructor(
        language: string,
        data: {
            uid_public: boolean;
            public: boolean;
            verified: boolean;
            player_info: any;
            hash: string;
            region: string;
            order: number;
        },
    ) {
        this.uidPublic = data.uid_public;
        this.public = data.public;
        this.verified = data.verified;
        this.player = new PlayerInfo(language, data.player_info);
        this.hash = data.hash;
        this.region = data.region;
        this.order = data.order;
    }
}
