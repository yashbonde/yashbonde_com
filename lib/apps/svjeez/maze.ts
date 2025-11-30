import type { SVGGenerator, SVGGeneratorParams } from './types';
import { shuffle } from './utils';

interface Cell {
    x: number;
    y: number;
    visited: boolean;
    walls: { top: boolean; right: boolean; bottom: boolean; left: boolean };
}

export class MazeGenerator implements SVGGenerator {
    generate(params: SVGGeneratorParams, random: () => number): string[] {
        const { width, height, cellSize } = params;
        // Default values for density and complexity
        const density = 80;
        const complexity = 3;
        const cols = Math.floor(width / cellSize);
        const rows = Math.floor(height / cellSize);

        // Create grid
        const grid: Cell[][] = [];
        for (let y = 0; y < rows; y++) {
            grid[y] = [];
            for (let x = 0; x < cols; x++) {
                grid[y][x] = {
                    x: x,
                    y: y,
                    visited: false,
                    walls: { top: true, right: true, bottom: true, left: true }
                };
            }
        }

        // Recursive backtracking maze generation
        const carveMaze = (cell: Cell) => {
            cell.visited = true;

            // Get neighbors
            const neighbors: Array<{ cell: Cell; dir: string }> = [];
            const { x, y } = cell;

            if (y > 0 && !grid[y - 1][x].visited) neighbors.push({ cell: grid[y - 1][x], dir: 'top' });
            if (x < cols - 1 && !grid[y][x + 1].visited) neighbors.push({ cell: grid[y][x + 1], dir: 'right' });
            if (y < rows - 1 && !grid[y + 1][x].visited) neighbors.push({ cell: grid[y + 1][x], dir: 'bottom' });
            if (x > 0 && !grid[y][x - 1].visited) neighbors.push({ cell: grid[y][x - 1], dir: 'left' });

            const shuffledNeighbors = shuffle(neighbors, random);

            for (const neighbor of shuffledNeighbors) {
                if (!neighbor.cell.visited) {
                    // Remove walls
                    if (neighbor.dir === 'top') {
                        cell.walls.top = false;
                        neighbor.cell.walls.bottom = false;
                    } else if (neighbor.dir === 'right') {
                        cell.walls.right = false;
                        neighbor.cell.walls.left = false;
                    } else if (neighbor.dir === 'bottom') {
                        cell.walls.bottom = false;
                        neighbor.cell.walls.top = false;
                    } else if (neighbor.dir === 'left') {
                        cell.walls.left = false;
                        neighbor.cell.walls.right = false;
                    }

                    carveMaze(neighbor.cell);
                }
            }
        };

        // Start maze generation
        carveMaze(grid[0][0]);

        // Add some random wall removal based on complexity (creates loops)
        const removalRate = (100 - density) / 100;
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cell = grid[y][x];
                if (random() < removalRate * complexity / 5) {
                    if (x < cols - 1 && random() > 0.5) {
                        cell.walls.right = false;
                        grid[y][x + 1].walls.left = false;
                    }
                    if (y < rows - 1 && random() > 0.5) {
                        cell.walls.bottom = false;
                        grid[y + 1][x].walls.top = false;
                    }
                }
            }
        }

        // Draw maze - only draw right and bottom walls to avoid duplicates
        const pathData: string[] = [];

        // Draw top border
        pathData.push(`M 0 0 L ${width} 0`);

        // Draw left border
        pathData.push(`M 0 0 L 0 ${height}`);

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cell = grid[y][x];
                const px = x * cellSize;
                const py = y * cellSize;

                // Only draw right and bottom walls (avoids duplicates)
                if (cell.walls.right) {
                    pathData.push(`M ${px + cellSize} ${py} L ${px + cellSize} ${py + cellSize}`);
                }
                if (cell.walls.bottom) {
                    pathData.push(`M ${px} ${py + cellSize} L ${px + cellSize} ${py + cellSize}`);
                }
            }
        }

        return pathData;
    }
}

