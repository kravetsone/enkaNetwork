export declare class character {
    id: number;
    name: string;
    icons: {
        avatar: string;
        side: string;
    };
    level: number;
    friendshipLevel: number;
    rarity: number;
    element: string;
    elevations: number;
    xp: number;
    constellation: any[];
    constructor(lang: string, character: any);
}
export declare class characterConstellation {
    id: number;
    icon: string;
    name: string;
    unlocked: boolean;
    constructor(lang: string, talent: number, talents: number[]);
}
