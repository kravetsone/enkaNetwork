import type { AssetsFinder } from "../../helpers";
import type { TLanguage } from "../../types";

export class CharacterSkill {
	id: number;
	icon: string;
	name: string;
	level: number;
	isBoosted: boolean;

	constructor(
		assets: AssetsFinder,
		language: TLanguage,
		skillId: number,
		level: number,
		proudSkillExtraLevelMap: Record<string, number>,
	) {
		const skill = assets.skills.getById(skillId);

		const boost = proudSkillExtraLevelMap[skill.proudSkillGroupId];

		this.id = skillId;
		this.icon = assets.getAssetPath(skill.skillIcon);
		this.name = assets.skills.getName(skill, language);
		this.isBoosted = !!boost;
		this.level = level + (boost || 0);
	}
}
