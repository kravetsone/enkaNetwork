import { AssetsFinder } from "../../helpers";
import { IPlayerInfo, TLanguage } from "../../types";
import { CharacterPreview, Namecard, ProfilePicture } from "../index";

export class PlayerInfo {
	nickname: string;
	signature?: string;
	level: number;
	worldLevel?: number;
	nameCard: Namecard;
	achievements: number;
	abyssFloor?: number;
	abyssLevel?: number;
	charactersPreview: CharacterPreview[];
	nameCardsPreview: Namecard[];
	profilePicture?: ProfilePicture;

	constructor(assets: AssetsFinder, language: TLanguage, data: IPlayerInfo) {
		this.nickname = data.nickname;
		this.signature = data.signature;
		this.level = data.level;
		this.worldLevel = data.worldLevel;
		this.nameCard = new Namecard(assets, language, data.nameCardId);
		this.achievements = data.finishAchievementNum || 0;
		this.abyssFloor = data.towerFloorIndex;
		this.abyssLevel = data.towerLevelIndex;
		this.charactersPreview = (data.showAvatarInfoList || []).map(
			(character) => new CharacterPreview(assets, language, character),
		);
		this.nameCardsPreview = (data.showNameCardIdList || []).map(
			(nameCardId) => new Namecard(assets, language, nameCardId),
		);

		this.profilePicture = data.profilePicture.avatarId
			? new ProfilePicture(assets, language, data.profilePicture)
			: undefined;
	}
}
