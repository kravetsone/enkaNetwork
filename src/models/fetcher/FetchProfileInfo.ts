import type { AssetsFinder } from "../../helpers";
import type { IProfileInfo, TLanguage } from "../../types";
import { PlayerInfo } from "../index";

export class FetchProfileInfo {
	player: PlayerInfo;
	ttl: number;

	constructor(assets: AssetsFinder, language: TLanguage, data: IProfileInfo) {
		this.player = new PlayerInfo(assets, language, data.playerInfo);
		this.ttl = data.ttl;
	}
}
