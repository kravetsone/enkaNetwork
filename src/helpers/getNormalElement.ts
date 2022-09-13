const elements: { [key: string]: string } = {
    "Ice": "Cryo",
    "Water": "Hydro",
    "Wind": "Anemo",
    "Fire": "Piro",
    "Rock": "Geo",
    "Electric": "Electro",
}
export function getNormalElement(element: string): string {
    return elements[element];
}