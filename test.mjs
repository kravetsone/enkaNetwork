import { enkaNetwork } from "./dist/index.js";
const enka = new enkaNetwork({});
const user = await enka.fetchUser(700832641);
console.log(user);