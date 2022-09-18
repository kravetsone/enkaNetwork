# enkaNetwork

> Node JS/TypeScript module that allows you to work with the site [enka.network](https://enka.network/) adding localization and convenience.

<div align='center'>
  <img src="assets/logo.png" alt="enkaNetwork" /> 
</div>

<div align='center'>
  <a href='https://github.com/kravetsone/enkaNetwork/tree/main/examples'><b>examples</b></a>
  <span>&nbsp;•&nbsp;</span>
  <a href='#-response-structure'><b>structure</b></a>
</div>
<br>
<div align='center'>
  <img src="https://img.shields.io/npm/dt/enkanetwork.svg" alt="Downloads" href="https://npmjs.com/package/enkanetwork" /> 
  <img src="https://img.shields.io/npm/dm/enkanetwork.svg" alt="Downloads/month" href="https://npmjs.com/package/enkanetwork" /> 
  <img src="https://img.shields.io/github/last-commit/kravetsone/enkaNetwork.svg" alt="last commit" href="https://github.com/kravetsone/enkaNetwork" /> 
  <img src="https://img.shields.io/github/stars/kravetsone/enkaNetwork.svg" alt="GitHub" href="https://github.com/kravetsone/enkaNetwork" /> 
  <img src="https://img.shields.io/npm/v/enkanetwork.svg" alt="npm" href="https://npmjs.com/package/enkanetwork" /> 
</div>

## 📦 Download

-   **используя `npm`**
    ```shell
    npm i enkanetwork
    ```
-   **используя `Yarn`**
    ```shell
    yarn add enkanetwork
    ```
# 🛠️ Usage

```js
const { enkaNetwork } = require("enkanetwork"); //import { enkaNetwork } from "enkanetwork";
const enka = new enkaNetwork({language: "EN"});
```

| Key       | In API | Type   | Description                                                                                                    | Required?    |
| --------- | ------ | ------ | -------------------------------------------------------------------------------------------------------------- | ------------ |
| language  |    -   | number | The language to be used in the localization of names (characters, artifacts, etc.). Default is «EN»            | -            |

```js
const user = await enka.fetchUser(700832641);
```

| Key       | In API | Type   | Description              | Required?    |
| --------- | ------ | ------ | ------------------------ | ------------ |
| UID       |    -   | number | `UID` from the game      | +            |
# ⚙ Response structure

## FetchUser

| Key        | In API         | Type   | Description                    |
| ---------  | ----------     | ------ | ------------------------------ |
| player     | playerInfo     | object | See [Player](#player)          |
| characters | avatarInfoList | array  | See [Characters](#characters)  |
| ttl        | ttl            | number | Cache lifetime in milliseconds |

## Player

| Key               | In API               | Type   | Description                                      |
| ----------------- | -------------------- | ------ | ------------------------------------------------ |
| nickname          | nickname             | string | Profile nickname                                 |
| signature         | signature            | string | Profile description                              |
| level             | level                | number | User rank level                                  |
| worldLevel        | worldLevel           | number | User world level                                 |
| nameCard          | -                    | object | See [NameCard](#namecard)                        |
| achievements      | finishAchievementNum | number | Achievements count                               |
| abyssFloor        | towerFloorIndex      | number | The floor of the abyss passed by the player      |
| abyssLevel        | towerLevelIndex      | number | The hall of the abyss floor passed by the player |
| charactersPreview | showAvatarInfoList   | array  | See [CharacterPreview](#characterpreview)        |
| nameCardsPreview  | showNameCardIdList   | array  | See [NameCard](#namecard)                        |
| profilePicture    | profilePicture       | object | See [ProfilePicture](#profilepicture)            |

### NameCard

| Key        | In API         | Type   | Description                    |
| ---------  | ----------     | ------ | ------------------------------ |
| id         | nameCardId     | number | Namecard id                    |
| name       | -              | string | Localized namecard name        |
| icon       | -              | string | URL to get the icon            |
| banner     | -              | string | URL to get the icon banner     |
| navbar     | -              | string | URL to get the icon navbar     |

### CharacterPreview

| Key        | In API         | Type   | Description                    |
| ---------  | ----------     | ------ | ------------------------------ |
| id         | avatarId       | number | Character id                   |
| name       | -              | string | Localized character name       |
| icon       | -              | string | URL to get the character icon  |
| level      | level          | number | Character level                |

### ProfilePicture

| Key        | In API         | Type   | Description                    |
| ---------  | ----------     | ------ | ------------------------------ |
| id         | avatarId       | number | Character id                   |
| name       | -              | string | Localized character name       |
| icon       | -              | string | URL to get the character icon  |

## Characters

| Key               | In API                 | Type   | Description                                           |
| ----------------- | ---------------------- | ------ | ----------------------------------------------------- |
| id                | avatarId               | number | Character id                                          |
| name              | -                      | string | Localized character name                              |
| icons             | -                      | object | See [Icons](#icons)                                   |
| rarity            | -                      | number | Character rarity (5 or 4)                             |
| element           | -                      | string | See [ElementType](#elementtype)                       |
| level             | propMap["4001"]        | number | Character level                                       |
| elevations        | propMap["1002"]        | number | Character elevations                                  |
| xp                | propMap["1001"]        | number | Character expiriance                                  |
| constellation     | talents                | array  | See [CharacterConstellation](#characterconstellation) |
| skills            | skills                 | array  | See [CharacterSkill](#characterskill)                 |
| skillSetId        | skillDepotId           | number | Character Skill Set ID                                |
| skillData         | inherentProudSkillList | array  | List of Unlocked Skill Ids                            |
| stats             | fightPropMap           | array  | Character stats                                       |
| weapon            | equipList              | number | See [CharacterWeapon](#characterweapon)               |
| reluquary         | equipList              | number | See [ProfilePicture](#profilepicture)                 |

### Icons

| Key        | In API         | Type   | Description                    |
| ---------  | ----------     | ------ | ------------------------------ |
| avatar     | -              | string | Character avatar icon          |
| side       | -              | string | Character side avatar icon     |

### ElementType
| Key            | In API         |
| -------------- | -------------- |
| Cryo           | Ice            |
| Hydro          | Water          |
| Anemo          | Wind           |
| Pyro           | Fire           |
| Geo            | Rock           |
| Electro        | Electric       |

### CharacterConstellation

| Key        | In API         | Type    | Description                                  |
| ---------  | -------------- | ------- | -------------------------------------------- |
| id         | talent         | number  | Character constellation id                   |
| name       | -              | string  | Character constellation name                 |
| icon       | -              | string  | URL to get the character constellation icon  |
| unlocked   | -              | boolean | Character constellation unlocked?            |

### CharacterSkill

| Key        | In API         | Type    | Description                                  |
| ---------  | -------------- | ------- | -------------------------------------------- |
| id         | skill          | number  | Character skill id                           |
| name       | -              | string  | Character skill name                         |
| icon       | -              | string  | URL to get the character skill icon          |
| level      | level          | number  | Character skill level                        |

### CharacterWeapon

| Key         | In API              | Type    | Description                                  |
| ----------- | ------------------- | ------- | -------------------------------------------- |
| id          | itemId              | number  | Character weapon id                          |
| name        | -                   | string  | Character weapon name                        |
| icon        | -                   | string  | URL to get the character weapon icon         |
| level       | level               | number  | Character weapon level                       |
| elevations  | weapon.promoteLevel | number  | Character weapon elevations                  |
| improvement | weapon.affixMap     | number  | Character weapon improvement                 |
| rarity      | flat.rankLevel      | number  | Character weapon rarity                       |
| mainStat    | flat.weaponStats[0] | object  | Character weapon main stat                   |
| subStat     | flat.weaponStats[1] | object  | Character weapon sub stat                    |

### CharacterReluquary

| Key         | In API                 | Type    | Description                                  |
| ----------- | ---------------------- | ------- | -------------------------------------------- |
| id          | itemId                 | number  | Character reluquary id                       |
| name        | -                      | string  | Character reluquary name                     |
| setName     | -                      | string  | Character reluquary set name                 |
| icon        | -                      | string  | URL to get the character reluquary icon      |
| type        | -                      | string  | See [ReliquaryType](#characterreluquary)     |
| level       | reliquary.level        | number  | Character reluquary level                    |
| rarity      | flat.rankLevel         | number  | Character reluquary rarity                   |
| mainStat    | flat.reliquaryMainstat | object  | Character reluquary main stat                |
| subStat     | flat.reliquarySubstats | object  | Character reluquary sub stat                 |

### ReliquaryType

| Key            | In API         |
| -------------- | -------------- |
| Flower         | EQUIP_BRACER   |
| Feather        | EQUIP_NECKLACE |
| Sands          | EQUIP_SHOES    |
| Goblet         | EQUIP_RING     |
| Circlet        | EQUIP_DRESS    |

For assets thanks [enkanetwork.py-data](https://github.com/mrwan200/enkanetwork.py-data/)