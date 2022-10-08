import { IPlayerInfo } from "../types/index";
import { EnkaProfile, PlayerInfo } from "./index";

export class FetchUserProfile {
    profile: boolean;
    accounts: { is_uid_public: boolean; player: PlayerInfo }[];
    enkaProfile: EnkaProfile;
    constructor(
        language: string,
        data: {
            profile: boolean;
            hoyos: { is_uid_public: boolean; player_info: IPlayerInfo }[];
            user: any;
            id: string;
        }
    ) {
        this.profile = data.profile;
        this.accounts = data.hoyos.map((account: any) => {
            return {
                is_uid_public: account.is_uid_public,
                player: new PlayerInfo(language, account.player_info),
            };
        });
        this.enkaProfile = new EnkaProfile(data.user, data.id);
    }
}
