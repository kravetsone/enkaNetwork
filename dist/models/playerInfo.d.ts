import { IPlayerInfo } from "../types/index";
import { NameCard, ProfilePicture, CharacterPreview } from "./index";
export declare class PlayerInfo {
    nickname: string;
    signature: string;
    level: number;
    worldLevel: number;
    nameCard: NameCard;
    achievements: number;
    abyssFloor: number;
    abyssLevel: number;
    charactersPreview: CharacterPreview[];
    nameCardsPreview: NameCard[];
    profilePicture: ProfilePicture;
    constructor(language: string, data: IPlayerInfo);
}
