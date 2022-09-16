import { enkaNetwork } from "./dist/index.js";
const enka = new enkaNetwork({language: "RU"});
const user = await enka.fetchUser(700832641);
console.log(user);
console.log(user.characters);
console.log("У юзера на аве стоит", user.playerInfo.profilePicture.name);