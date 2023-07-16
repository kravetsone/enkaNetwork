import { EnkaNetwork } from "enkanetwork";

const enka = new EnkaNetwork({ language: "EN" });

const user = await enka.fetchUser(700832641);

console.log(`User name is ${user.player.nickname}`);
console.log(`User description is ${user.player.signature}`);
console.log(`On profile picture - ${user.player.profilePicture.name}`);
