import { EnkaNetwork } from "./dist/index.js";
const enka = new EnkaNetwork({ language: "RU" });
const user = await enka.fetchUser("kaito", "EN");//700832641);
const accounts = await enka.fetchAccounts("kaito");
console.log(user, accounts);
console.log("У юзера на аве стоит", user.player.profilePicture.name);