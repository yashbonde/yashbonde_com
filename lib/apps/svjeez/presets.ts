export interface Ratio {
    name: string;
    widthRatio: number;
    heightRatio: number;
}

export const RATIOS: Record<string, Ratio> = {
    // Paper sizes (Portrait)
    'A4': { name: 'A4', widthRatio: 210, heightRatio: 297 },
    'A5': { name: 'A5', widthRatio: 148, heightRatio: 210 },
    'Letter': { name: 'Letter', widthRatio: 216, heightRatio: 279 },

    // Paper sizes (Landscape)
    'A4 Landscape': { name: 'A4 Landscape', widthRatio: 297, heightRatio: 210 },
    'A5 Landscape': { name: 'A5 Landscape', widthRatio: 210, heightRatio: 148 },
    'Letter Landscape': { name: 'Letter Landscape', widthRatio: 279, heightRatio: 216 },

    // Standard ratios
    '1:1': { name: '1:1', widthRatio: 1, heightRatio: 1 },
    '4:3': { name: '4:3', widthRatio: 4, heightRatio: 3 },
    '3:4': { name: '3:4', widthRatio: 3, heightRatio: 4 },
    '16:9': { name: '16:9', widthRatio: 16, heightRatio: 9 },
    '9:16': { name: '9:16', widthRatio: 9, heightRatio: 16 },
    '21:9': { name: '21:9', widthRatio: 21, heightRatio: 9 },
    '2:1': { name: '2:1', widthRatio: 2, heightRatio: 1 },
    '5:4': { name: '5:4', widthRatio: 5, heightRatio: 4 },
    '4:5': { name: '4:5', widthRatio: 4, heightRatio: 5 },

    // Golden ratio
    'Golden': { name: 'Golden', widthRatio: 1, heightRatio: 1.618 },
    'Golden Landscape': { name: 'Golden Landscape', widthRatio: 1.618, heightRatio: 1 },

    // Social media
    'Instagram Post': { name: 'Instagram Post', widthRatio: 1, heightRatio: 1 },
    'Instagram Story': { name: 'Instagram Story', widthRatio: 9, heightRatio: 16 },
    'Instagram Reel': { name: 'Instagram Reel', widthRatio: 9, heightRatio: 16 },
    'Twitter Header': { name: 'Twitter Header', widthRatio: 3, heightRatio: 1 },
    'Facebook Cover': { name: 'Facebook Cover', widthRatio: 16, heightRatio: 9 },
    'YouTube Thumbnail': { name: 'YouTube Thumbnail', widthRatio: 16, heightRatio: 9 },
    'LinkedIn Cover': { name: 'LinkedIn Cover', widthRatio: 4, heightRatio: 1 },
};

export function getRatio(name: string): Ratio | undefined {
    return RATIOS[name];
}

export function getRatioNames(): string[] {
    return Object.keys(RATIOS);
}

export function calculateDimensions(ratioName: string, size: number): { width: number; height: number } {
    const ratio = getRatio(ratioName);
    if (!ratio) {
        return { width: size, height: size };
    }

    // Determine which dimension is shorter based on the ratio
    const isWidthShorter = ratio.widthRatio < ratio.heightRatio;

    if (isWidthShorter) {
        // Width is the shorter dimension
        const width = size;
        const height = size * (ratio.heightRatio / ratio.widthRatio);
        return { width, height };
    } else {
        // Height is the shorter dimension (or equal)
        const height = size;
        const width = size * (ratio.widthRatio / ratio.heightRatio);
        return { width, height };
    }
}

