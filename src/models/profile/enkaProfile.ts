export class EnkaProfile {
    username: string;
    bio: string;
    level: number;
    drawName: boolean;
    drawUid: boolean;
    signupState: number;
    imageUrl: string;
    id: string;
    constructor(data: {
        username: string;
        profile: {
            bio: string;
            level: number;
            draw_name: boolean;
            draw_uid: boolean;
            signup_state: number;
            image_url: string;
        };
    }, id: string) {
        this.id = id;
        this.username = data.username;
        this.bio = data.profile.bio;
        this.level = data.profile.level;
        this.drawName = data.profile.draw_name;
        this.drawUid = data.profile.draw_uid;
        this.signupState = data.profile.signup_state;
        this.imageUrl = data.profile.image_url;
    }
}