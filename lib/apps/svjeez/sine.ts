import type { SVGGenerator, SVGGeneratorParams } from './types';

export class SineWaveGenerator implements SVGGenerator {
    generate(params: SVGGeneratorParams, random: () => number): string[] {
        const { width, height, waves = [], windowSize = 1 } = params;
        
        if (waves.length === 0) {
            return [];
        }

        const pathData: string[] = [];
        const centerY = height / 2;
        // windowSize periods on each side = 2 * windowSize periods total
        const frequency = (4 * Math.PI * windowSize) / width;

        // Generate a path for each wave
        for (let waveIndex = 0; waveIndex < waves.length; waveIndex++) {
            const wave = waves[waveIndex];
            const { amplitude, phaseShift, multiplyWith = [] } = wave;
            const points: string[] = [];

            for (let x = 0; x <= width; x++) {
                // Calculate base wave value (normalized to -1 to 1)
                let yValue = Math.sin(frequency * x + phaseShift);
                
                // Multiply with other waves if specified
                if (multiplyWith.length > 0) {
                    for (const otherIndex of multiplyWith) {
                        if (otherIndex >= 0 && otherIndex < waves.length && otherIndex !== waveIndex) {
                            const otherWave = waves[otherIndex];
                            const otherValue = Math.sin(frequency * x + otherWave.phaseShift);
                            yValue *= otherValue; // Multiply normalized values
                        }
                    }
                }
                
                // Apply amplitude after multiplication to maintain reasonable scale
                const y = centerY + amplitude * yValue;
                if (x === 0) {
                    points.push(`M ${x} ${y}`);
                } else {
                    points.push(`L ${x} ${y}`);
                }
            }

            // Store path data with metadata (we'll handle line width in the page component)
            pathData.push(points.join(' '));
        }

        return pathData;
    }
}

