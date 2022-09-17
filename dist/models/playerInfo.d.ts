import { IPlayerInfo } from "../types/index";
import { nameCard } from "./nameCard";
import { profilePicture } from "./profilePicture";
import { characterPreview } from "./characterPreview";
export declare class playerInfo {
    nickname: string;
    signature: string;
    level: number;
    worldLevel: number;
    nameCard: nameCard;
    achievements: number;
    abyssFloor: number;
    abyssLevel: number;
    charactersPreview: characterPreview[];
    nameCardsPreview: nameCard[];
    profilePicture: profilePicture;
    constructor(language: string, data: IPlayerInfo);
}
