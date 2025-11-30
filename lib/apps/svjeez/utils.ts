// Random number generator with seed
export class SeededRandom {
    private seed: number;

    constructor(seed: number = Math.random()) {
        this.seed = seed;
    }

    random(): number {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    setSeed(seed: number): void {
        this.seed = seed;
    }
}

// Shuffle array
export function shuffle<T>(array: T[], random: () => number): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}




