# enkaNetwork

> Node JS [enka.network](https://enka.network/) API wrapper written on TypeScript which provides `auto-updated assets`, localization, caching and convenience.

<div align="center">
  <img src="https://github.com/kravetsone/enkaNetwork/assets/57632712/60fbc4d8-d2f3-4735-9512-5313262f2f80" alt="enkaNetwork" /> 
</div>

<div align="center">
  <a href="https://kravets.gitbook.io/enkanetwork"><b>documentation</b></a>
  <span>&nbsp;•&nbsp;</span>
  <a href="https://kravets.gitbook.io/enkanetwork/examples"><b>examples</b></a>
  
  
</div>
<br>
<div align="center">
  <img src="https://img.shields.io/npm/dt/enkanetwork.svg" alt="Downloads" href="https://npmjs.com/package/enkanetwork" /> 
  <img src="https://img.shields.io/npm/dm/enkanetwork.svg" alt="Downloads/month" href="https://npmjs.com/package/enkanetwork" />
  <img src="https://img.shields.io/github/last-commit/kravetsone/enkaNetwork.svg" alt="last commit" href="https://github.com/kravetsone/enkaNetwork" /> 
  <img src="https://img.shields.io/github/stars/kravetsone/enkaNetwork.svg" alt="GitHub" href="https://github.com/kravetsone/enkaNetwork" /> 
  <img src="https://img.shields.io/npm/v/enkanetwork.svg" alt="npm" href="https://npmjs.com/package/enkanetwork" /> 
</div>

## 📦 Download

-   **usage `npm`**
    ```shell
    npm install enkanetwork --languages=EN
    ```
-   **usage `yarn`**

    ```shell
    yarn add enkanetwork --languages=EN
    ```

-   **usage `pnpm`**

    ```shell
    pnpm install enkanetwork --languages=EN
    ```

-   **usage `bun`**
    ```shell
    bun install enkanetwork --languages=EN
    ```

## 🎮 Game support

This wrapper currently supports **Genshin Impact only**. enka.network also serves
Honkai: Star Rail (`/hsr/uid/`), Zenless Zone Zero (`/zzz/uid/`) and Arknights: Endfield,
but those endpoints are not implemented here. The bundled game data is sourced from
[`Dimbreath/AnimeGameData`](https://gitlab.com/Dimbreath/AnimeGameData) (`master` branch,
`ExcelBinOutput/` + `TextMap/`), the canonical Genshin datamine.

## 🖼️ Image assets & CDNs

Every icon URL is produced by a pluggable **asset adapter**. By default icons resolve to
`https://enka.network/ui/{icon}.png`.

> [!NOTE]
> enka.network only hosts images that are actually used on the site, so a freshly
> released icon may `404`. In that case point the adapter at another CDN.

All of these mirror the **same internal `UI_*` filenames** from the game data, so only the
prefix (and extension) change — no custom code needed:

| CDN | `baseUrl` | `extension` |
| --- | --- | --- |
| enka.network (default) | `https://enka.network/ui/` | `.png` |
| Hakush.in | `https://static.nanoka.cc/gi/UI/` | `.webp` |
| Project Amber | `https://gi.yatta.moe/assets/UI/` | `.png` |

```ts
import { EnkaNetwork, OriginAdapter, FileSystemAdapter } from "enkanetwork";

// Use a different CDN (e.g. Hakush.in / webp)
new EnkaNetwork({
    assetAdapter: new OriginAdapter({
        baseUrl: "https://static.nanoka.cc/gi/UI/",
        extension: ".webp",
    }),
});

// Cache icons to the local filesystem (lazy download, origin fallback)
new EnkaNetwork({
    assetAdapter: new FileSystemAdapter({ directory: "./.enka-cache/ui" }),
});

// Already have a complete local mirror? Just point at it:
new EnkaNetwork({
    assetAdapter: new OriginAdapter({ baseUrl: "/root/guoba/assets/ui/" }),
});

// Bring your own: anything implementing `{ resolve(filename): string }`
new EnkaNetwork({
    assetAdapter: { resolve: (file) => `https://my.cdn/${file}.webp` },
});
```

The legacy `uiAssetsPath` option still works (it builds an `OriginAdapter` for you).

Warm the cache after a fetch so every referenced icon (incl. `weapon.awakenIcon` and the
gacha/costume splash exposed as `icons.gacha`) lands on disk:

```ts
const user = await enka.fetchUser(uid);
await enka.assets.warm(); // awaits all pending downloads
```

> [!WARNING]
> `FileSystemAdapter` only caches the filenames the library returns. Prefer the exposed
> fields (`weapon.awakenIcon`, `icons.gacha`) over string-deriving names like
> `icon.replace(".png", "_Awaken.png")` — derived names never pass through the cache.
> For renderers that need guaranteed-local paths, use `fallbackToOrigin: false` + `warm()`,
> or point an `OriginAdapter` at a complete local mirror. The HoYoverse in-game CDN uses
> hashed paths (not `UI_*` names), so it needs a custom adapter, not a `baseUrl` swap.

# You can see more information in the [documentation](https://kravets.gitbook.io/enkanetwork)
