export type PatternType = 'maze' | 'contour' | 'grid' | 'sine' | 'cellular-automata'; // Add more patterns as needed

export interface WaveConfig {
    amplitude: number;
    phaseShift: number;
    lineWidth: number;
    multiplyWith?: number[]; // Indices of other waves to multiply with
}

export interface SVGGeneratorParams {
    width: number;
    height: number;
    cellSize: number;
    lineWidth: number;
    waves?: WaveConfig[]; // For sine wave pattern
    windowSize?: number; // For sine wave pattern - number of periods on each side
    dim?: number; // For cellular automata - size of the square (cell size)
    speed?: number; // For cellular automata - number of generations to evolve
}

export interface SVGGenerator {
    generate: (params: SVGGeneratorParams, random: () => number) => string[];
}

