import { AssetsFinder } from "../../helpers";
import { IEnkaAccountBuildData, TLanguage } from "../../types";
import { Character } from "../index";

export class FetchEnkaHoyoBuilds {
    id: number;
    name: string;
    avatarId: number;
    hoyo_type: number;
    public: boolean;
    settings: unknown;
    order: number;
    avatar: Character;
    live: boolean;
    image: string | null;

    constructor(
        assets: AssetsFinder,
        language: TLanguage,
        data: IEnkaAccountBuildData,
    ) {
        this.id = data.id;
        this.name = data.name;
        this.avatarId = +data.avatar_id;
        this.avatar = new Character(assets, language, data.avatar_data);
        this.order = data.order;
        this.live = data.live;
        this.settings = data.settings;
        this.public = data.public;
        this.image = data.image;
        this.hoyo_type = data.hoyo_type;
    }
}
