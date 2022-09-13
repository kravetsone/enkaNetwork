"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNormalElement = void 0;
const elements = {
    "Ice": "Cryo",
    "Water": "Hydro",
    "Wind": "Anemo",
    "Fire": "Piro",
    "Rock": "Geo",
    "Electric": "Electro",
};
function getNormalElement(element) {
    return elements[element];
}
exports.getNormalElement = getNormalElement;
