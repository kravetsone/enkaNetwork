import { enkaNetwork } from "./dist/index.js";
const enka = new enkaNetwork({language: "RU"});
const user = await enka.fetchUser(700832641);
console.log(user, user.playerInfo.nameCardsPreview, user.playerInfo.charactersPreview);
console.log(user.characters, user.characters[6]);
console.log("У юзера на аве стоит", user.playerInfo.profilePicture.name);