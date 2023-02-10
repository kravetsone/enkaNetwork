import { IPlayerInfo } from "../types/index";
import { EnkaProfile, PlayerInfo } from "./index";

export class FetchUserProfile {
    profile: EnkaProfile;
    constructor(
        data: any
    ) {
        this.profile = new EnkaProfile(data);
    }
}
