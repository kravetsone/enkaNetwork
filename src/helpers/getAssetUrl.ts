export function getAssetUrl(filename: string): string | undefined {
    return filename.length > 0
        ? `https://enka.network/ui/${filename}.png`
        : undefined;
}
