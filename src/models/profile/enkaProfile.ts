export class EnkaProfile {
    username: string;
    bio: string;
    level: number;
    signupState: number;
    imageUrl: string;
    constructor(data: {
        username: string;
        profile: {
            bio: string;
            level: number;
            signup_state: number;
            image_url: string;
        };
    }) {
        this.username = data.username;
        this.bio = data.profile.bio;
        this.level = data.profile.level;
        this.signupState = data.profile.signup_state;
        this.imageUrl = data.profile.image_url;
    }
}
