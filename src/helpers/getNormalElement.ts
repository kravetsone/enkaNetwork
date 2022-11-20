const elements: { [key: string]: string } = {
    Ice: "Cryo",
    Water: "Hydro",
    Wind: "Anemo",
    Fire: "Pyro",
    Rock: "Geo",
    Electric: "Electro",
} as const;

export function getNormalElement(element: string): string {
    return elements[element];
}
