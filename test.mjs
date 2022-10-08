import { EnkaNetwork } from "./dist/index.js";
const enka = new EnkaNetwork({ language: "RU" });
console.log(enka)
let time = Date.now();
const user = await enka.fetchUser(700832641, "EN");//"kaito");
console.log(1, user, Date.now() - time);
time = Date.now();
const user2 = await enka.fetchUser(700832641, "EN");
console.log(2, user2.player.profilePicture.name, Date.now() - time);
console.log(`User name is ${user.player.nickname}`);
console.log(`User description is ${user.player.signature}`);
console.log(`On profile picture - ${user.player.profilePicture.name}`);

console.log("У юзера на аве стоит", user.player.profilePicture.name);
