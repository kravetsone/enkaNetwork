import type { AssetsFinder } from "../../helpers";
import type { IProfileAvatarsInfo, TLanguage } from "../../types";
import { Character, PlayerInfo } from "../index";

export class FetchUserUID {
	player: PlayerInfo;
	characters: Character[];
	ttl: number;

	constructor(
		assets: AssetsFinder,
		language: TLanguage,
		data: IProfileAvatarsInfo,
	) {
		this.player = new PlayerInfo(assets, language, data.playerInfo);
		this.characters = (data.avatarInfoList || []).map(
			(avatar) => new Character(assets, language, avatar),
		);
		this.ttl = data.ttl;
	}
}
