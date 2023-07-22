import { AssetsFinder } from "../../helpers";
import { IShowAvatarInfoList, TLanguage } from "../../types";

export class CharacterPreview {
    id: number;
    costumeId: number | null;
    costumeName: string | null;
    name: string;
    icon?: string;
    level: number;

    constructor(
        assets: AssetsFinder,
        language: TLanguage,
        characterPreview: IShowAvatarInfoList,
    ) {
        const character = assets.characters.getById(characterPreview.avatarId);
        const costume = characterPreview.costumeId
            ? assets.costumes.getById(characterPreview.costumeId)
            : undefined;

        this.id = characterPreview.avatarId;
        this.costumeId = costume ? costume.id : null;
        this.costumeName = costume
            ? assets.costumes.getName(costume, language)
            : null;
        this.name = assets.characters.getName(character, language);
        this.icon = assets.getAssetPath(
            costume ? costume.iconName : character.iconName,
        );
        this.level = characterPreview.level;
    }
}
