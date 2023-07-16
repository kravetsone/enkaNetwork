import { EnkaProfile } from "./index";

export class FetchUserProfile {
    profile: EnkaProfile;
    constructor(data: any) {
        this.profile = new EnkaProfile(data);
    }
}
