import type { PatternType, SVGGenerator } from './types';
import { MazeGenerator } from './maze';
import { SineWaveGenerator } from './sine';
import { CellularAutomataGenerator } from './cellular-automata';

const generators: Record<PatternType, SVGGenerator> = {
    maze: new MazeGenerator(),
    sine: new SineWaveGenerator(),
    'cellular-automata': new CellularAutomataGenerator(),
    // Add more generators here as they're created
    contour: new MazeGenerator(), // Placeholder
    grid: new MazeGenerator(), // Placeholder
};

export function getGenerator(pattern: PatternType): SVGGenerator {
    return generators[pattern];
}

export function getAvailablePatterns(): PatternType[] {
    return Object.keys(generators) as PatternType[];
}


