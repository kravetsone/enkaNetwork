export function getAssetUrl(filename: string): string | undefined {
    return filename.length
        ? `https://enka.network/ui/${filename}.png`
        : undefined;
}
