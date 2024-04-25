import type { IEnkaProfileData } from "../../types";
import { EnkaProfile } from "../index";

export class FetchEnkaProfile {
	profile: EnkaProfile;
	constructor(data: IEnkaProfileData) {
		this.profile = new EnkaProfile(data);
	}
}
