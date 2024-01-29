import { IEnkaProfileData } from "../../types";

// [DOCUMENTATION](https://app.gitbook.com/o/37WAVmOUOTPfNqDwXYiL/s/HRuRVaMzLuUsL0mMhv72/~/changes/3/models/enkaprofile)
export class EnkaProfile {
	// Username of enka.network account
	username: string;
	// Description of enka.network account
	bio: string;
	// Level of enka.network account
	level: number;
	// State of enka.network account signUp
	signupState: number;
	// Account profile picture
	imageUrl: string;

	constructor(data: IEnkaProfileData) {
		this.username = data.username;
		this.bio = data.profile.bio;
		this.level = data.profile.level;
		this.signupState = data.profile.signup_state;
		this.imageUrl = data.profile.image_url;
	}
}
