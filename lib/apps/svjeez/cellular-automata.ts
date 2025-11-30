import type { SVGGenerator, SVGGeneratorParams } from './types';

export class CellularAutomataGenerator implements SVGGenerator {
    generate(params: SVGGeneratorParams, random: () => number): string[] {
        const { width, height, dim = 20, speed = 5 } = params;
        
        // Calculate grid dimensions based on dim (cell size)
        const cols = Math.floor(width / dim);
        const rows = Math.floor(height / dim);
        
        // Initialize grid with random state (0 = dead, 1 = alive)
        let grid: number[][] = [];
        for (let y = 0; y < rows; y++) {
            grid[y] = [];
            for (let x = 0; x < cols; x++) {
                // Random initial state (30% chance of being alive)
                grid[y][x] = random() < 0.3 ? 1 : 0;
            }
        }
        
        // Evolve the grid for 'speed' generations using Conway's Game of Life rules
        for (let generation = 0; generation < speed; generation++) {
            const newGrid: number[][] = [];
            
            for (let y = 0; y < rows; y++) {
                newGrid[y] = [];
                for (let x = 0; x < cols; x++) {
                    // Count live neighbors
                    let neighbors = 0;
                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            if (dx === 0 && dy === 0) continue;
                            const ny = y + dy;
                            const nx = x + dx;
                            if (ny >= 0 && ny < rows && nx >= 0 && nx < cols) {
                                neighbors += grid[ny][nx];
                            }
                        }
                    }
                    
                    // Apply Conway's Game of Life rules
                    if (grid[y][x] === 1) {
                        // Live cell
                        if (neighbors === 2 || neighbors === 3) {
                            newGrid[y][x] = 1; // Survives
                        } else {
                            newGrid[y][x] = 0; // Dies
                        }
                    } else {
                        // Dead cell
                        if (neighbors === 3) {
                            newGrid[y][x] = 1; // Becomes alive
                        } else {
                            newGrid[y][x] = 0; // Stays dead
                        }
                    }
                }
            }
            
            grid = newGrid;
        }
        
        // Generate path data - only draw outlines of cells that are alive
        const pathData: string[] = [];
        
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (grid[y][x] === 1) {
                    const px = x * dim;
                    const py = y * dim;
                    
                    // Draw the outline of the square (only borders, no fill)
                    // Top edge
                    pathData.push(`M ${px} ${py} L ${px + dim} ${py}`);
                    // Right edge
                    pathData.push(`M ${px + dim} ${py} L ${px + dim} ${py + dim}`);
                    // Bottom edge
                    pathData.push(`M ${px + dim} ${py + dim} L ${px} ${py + dim}`);
                    // Left edge
                    pathData.push(`M ${px} ${py + dim} L ${px} ${py}`);
                }
            }
        }
        
        return pathData;
    }
}



