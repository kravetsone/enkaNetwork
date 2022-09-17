import { enkaNetwork } from "./dist/index.js";
const enka = new enkaNetwork({language: "RU"});
const user = await enka.fetchUser(700832641);
console.log(user.characters[0].weapon);
// console.log(user.characters);
console.log("У юзера на аве стоит", user.player.profilePicture.name);