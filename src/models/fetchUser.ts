import { playerInfo } from "./playerInfo";
export class fetchUser {
    playerInfo: playerInfo;
    avatarInfoList: string[];
    constructor(language: string, data: {
        avatarInfoList: string[]; playerInfo: playerInfo
    }) {
        this.playerInfo = new playerInfo(language, data.playerInfo);
        this.avatarInfoList = data.avatarInfoList;
    }
}