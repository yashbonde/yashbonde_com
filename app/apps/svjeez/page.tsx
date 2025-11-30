'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Maximize2, X, Play, Pause } from 'lucide-react';
import { getGenerator, getAvailablePatterns } from '@/lib/apps/svjeez/generators';
import { SeededRandom } from '@/lib/apps/svjeez/utils';
import { getRatioNames, RATIOS, calculateDimensions } from '@/lib/apps/svjeez/presets';
import type { PatternType, WaveConfig } from '@/lib/apps/svjeez/types';

export default function SVGGenerator() {
    const svgRef = useRef<SVGSVGElement>(null);
    const fullscreenSvgRef = useRef<SVGSVGElement>(null);
    const seededRandom = useRef(new SeededRandom());

    const [pattern, setPattern] = useState<PatternType>('maze');
    const [ratio, setRatio] = useState<string>('1:1');
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Pattern-specific controls
    const [cellSize, setCellSize] = useState(20); // For maze pattern (min 8)
    const [waves, setWaves] = useState<WaveConfig[]>([
        { amplitude: 50, phaseShift: 0, lineWidth: 2 }
    ]); // For sine wave pattern
    const [windowSize, setWindowSize] = useState(1); // For sine wave pattern - periods on each side
    const [dim, setDim] = useState(20); // For cellular automata - size of the square
    const [speed, setSpeed] = useState(5); // For cellular automata - number of generations
    const [seed, setSeed] = useState(500000); // For cellular automata - seed value (0 to 1000000)
    const [isPlaying, setIsPlaying] = useState(false); // For cellular automata animation
    const [caGrid, setCaGrid] = useState<number[][] | null>(null); // Store cellular automata grid state
    const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Fixed line width
    const lineWidth = 2;

    // Fixed base size (not shown to user)
    const baseSize = 600;

    // Calculate dimensions based on ratio and base size
    const { width, height } = calculateDimensions(ratio, baseSize);

    // Initialize cellular automata grid with seed
    const initializeCAGrid = (useSeed?: number): number[][] => {
        const cols = Math.floor(width / dim);
        const rows = Math.floor(height / dim);
        const grid: number[][] = [];

        // Use provided seed or current seed state
        const seedValue = useSeed !== undefined ? useSeed : seed;
        // Normalize seed to 0-1 range for SeededRandom
        const normalizedSeed = (seedValue % 1000000) / 1000000;
        const tempRandom = new SeededRandom(normalizedSeed);

        for (let y = 0; y < rows; y++) {
            grid[y] = [];
            for (let x = 0; x < cols; x++) {
                grid[y][x] = tempRandom.random() < 0.3 ? 1 : 0;
            }
        }
        return grid;
    };

    // Evolve cellular automata grid one generation
    const evolveCAGrid = (grid: number[][]): number[][] => {
        const cols = grid[0].length;
        const rows = grid.length;
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
                    newGrid[y][x] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
                } else {
                    newGrid[y][x] = neighbors === 3 ? 1 : 0;
                }
            }
        }

        return newGrid;
    };

    // Render cellular automata grid to SVG path data
    const renderCAGrid = (grid: number[][]): string[] => {
        const pathData: string[] = [];
        const cols = grid[0].length;
        const rows = grid.length;

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (grid[y][x] === 1) {
                    const px = x * dim;
                    const py = y * dim;
                    // Draw the outline of the square (only borders, no fill)
                    pathData.push(`M ${px} ${py} L ${px + dim} ${py}`);
                    pathData.push(`M ${px + dim} ${py} L ${px + dim} ${py + dim}`);
                    pathData.push(`M ${px + dim} ${py + dim} L ${px} ${py + dim}`);
                    pathData.push(`M ${px} ${py + dim} L ${px} ${py}`);
                }
            }
        }

        return pathData;
    };

    const generateSVG = (targetSvg: SVGSVGElement | null) => {
        if (!targetSvg) return;

        try {
            // Clear SVG
            targetSvg.innerHTML = '';
            targetSvg.setAttribute('style', 'background: transparent;');
            targetSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
            targetSvg.setAttribute('width', width.toString());
            targetSvg.setAttribute('height', height.toString());

            // Add artwork boundary rectangle
            const boundary = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            boundary.setAttribute('x', '0');
            boundary.setAttribute('y', '0');
            boundary.setAttribute('width', width.toString());
            boundary.setAttribute('height', height.toString());
            boundary.setAttribute('fill', 'none');
            boundary.setAttribute('stroke', '#d1d5db'); // light grey
            boundary.setAttribute('stroke-width', '1');
            targetSvg.appendChild(boundary);

            let pathData: string[];

            if (pattern === 'cellular-automata' && caGrid) {
                // Use stored grid state for animation
                pathData = renderCAGrid(caGrid);
            } else {
                // Generate pattern normally
                const generator = getGenerator(pattern);
                let params;
                if (pattern === 'sine') {
                    params = { width, height, cellSize, lineWidth, waves, windowSize };
                } else if (pattern === 'cellular-automata') {
                    params = { width, height, cellSize, lineWidth, dim, speed };
                } else {
                    params = { width, height, cellSize, lineWidth };
                }

                pathData = generator.generate(
                    params,
                    () => seededRandom.current.random()
                );

                // If cellular automata and not playing, initialize grid from generator result
                if (pattern === 'cellular-automata' && !isPlaying && !caGrid) {
                    // Initialize grid state for potential animation
                    const initialGrid = initializeCAGrid(seed);
                    // Evolve for initial speed generations to match generator output
                    let evolvedGrid = initialGrid;
                    for (let gen = 0; gen < speed; gen++) {
                        evolvedGrid = evolveCAGrid(evolvedGrid);
                    }
                    setCaGrid(evolvedGrid);
                }
            }

            if (pattern === 'sine') {
                // For sine waves, create multiple path elements (one per wave)
                // The pathData array contains one path string per wave
                waves.forEach((wave, index) => {
                    if (pathData[index]) {
                        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        path.setAttribute('d', pathData[index]);
                        path.setAttribute('fill', 'none');
                        path.setAttribute('stroke', 'black');
                        path.setAttribute('stroke-width', wave.lineWidth.toString());
                        path.setAttribute('stroke-linecap', 'round');
                        path.setAttribute('stroke-linejoin', 'round');
                        targetSvg.appendChild(path);
                    }
                });
            } else {
                // For other patterns, create single path element
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', pathData.join(' '));
                path.setAttribute('fill', 'none');
                path.setAttribute('stroke', 'black');
                path.setAttribute('stroke-width', lineWidth.toString());
                path.setAttribute('stroke-linecap', 'round');
                path.setAttribute('stroke-linejoin', 'round');
                targetSvg.appendChild(path);
            }

        } catch (error) {
            console.error('Error generating SVG:', error);
        }
    };

    const randomize = () => {
        // Only randomize pattern-specific values
        if (pattern === 'maze') {
            setCellSize(Math.floor(Math.random() * 42 + 8)); // Min 8, max 50
        } else if (pattern === 'sine') {
            // Randomize each wave's parameters
            setWaves(waves.map(wave => ({
                amplitude: Math.random() * 100 + 10, // 10 to 110
                phaseShift: Math.random() * Math.PI * 2, // 0 to 2π
                lineWidth: Math.random() * 4 + 1 // 1 to 5
            })));
        } else if (pattern === 'cellular-automata') {
            setDim(Math.floor(Math.random() * 30 + 10)); // Min 10, max 40
            setSpeed(Math.floor(Math.random() * 20 + 1)); // Min 1, max 20
        }
        // Generate new seed for pattern generation
        seededRandom.current.setSeed(Math.random());
    };

    // Deduplicate overlapping line segments in path data
    const deduplicatePaths = (pathCommands: string[]): string[] => {
        // Extract all line segments and normalize them
        const segmentSet = new Set<string>();

        for (const cmd of pathCommands) {
            const trimmed = cmd.trim();
            if (!trimmed) continue;

            // Parse path commands (M x y L x y format)
            // Each command is like "M 10 20 L 30 20" or just "M 10 20 L 30 20" as one string
            const parts = trimmed.match(/([ML])\s+([\d.]+)\s+([\d.]+)/g);

            if (parts && parts.length >= 2) {
                // Extract coordinates from M and L commands
                const moveMatch = parts[0].match(/M\s+([\d.]+)\s+([\d.]+)/);
                const lineMatch = parts[1].match(/L\s+([\d.]+)\s+([\d.]+)/);

                if (moveMatch && lineMatch) {
                    const x1 = parseFloat(moveMatch[1]);
                    const y1 = parseFloat(moveMatch[2]);
                    const x2 = parseFloat(lineMatch[1]);
                    const y2 = parseFloat(lineMatch[2]);

                    // Normalize segment (always use smaller x, then smaller y for same x)
                    // This ensures same segment in opposite direction is treated as same
                    let normalized: string;
                    const tolerance = 0.001; // For floating point comparison
                    if (Math.abs(x1 - x2) < tolerance && Math.abs(y1 - y2) < tolerance) {
                        // Skip zero-length segments
                        continue;
                    }

                    if (x1 < x2 - tolerance || (Math.abs(x1 - x2) < tolerance && y1 < y2 - tolerance)) {
                        normalized = `${x1.toFixed(3)},${y1.toFixed(3)},${x2.toFixed(3)},${y2.toFixed(3)}`;
                    } else {
                        normalized = `${x2.toFixed(3)},${y2.toFixed(3)},${x1.toFixed(3)},${y1.toFixed(3)}`;
                    }

                    segmentSet.add(normalized);
                }
            }
        }

        // Convert back to path commands
        const deduplicatedPaths: string[] = [];
        for (const segment of segmentSet) {
            const [x1, y1, x2, y2] = segment.split(',').map(Number);
            deduplicatedPaths.push(`M ${x1} ${y1} L ${x2} ${y2}`);
        }

        return deduplicatedPaths;
    };

    const downloadSVG = () => {
        if (!svgRef.current) return;

        const svg = svgRef.current;
        // Clone the SVG to avoid modifying the original
        const svgClone = svg.cloneNode(true) as SVGSVGElement;

        // Ensure no background or white elements
        svgClone.setAttribute('style', 'background: transparent;');
        svgClone.setAttribute('fill', 'none');

        // Deduplicate overlapping strokes for all patterns
        const pathElements = svgClone.querySelectorAll('path');
        pathElements.forEach((pathEl) => {
            const pathData = pathEl.getAttribute('d');
            if (pathData) {
                // Split path data into individual M...L segments
                // Path format is: "M x1 y1 L x2 y2 M x3 y3 L x4 y4 ..."
                const segments = pathData.match(/M\s+[\d.]+\s+[\d.]+\s+L\s+[\d.]+\s+[\d.]+/g) || [];

                if (segments.length > 0) {
                    // Deduplicate
                    const deduplicated = deduplicatePaths(segments);
                    // Update path with deduplicated data
                    pathEl.setAttribute('d', deduplicated.join(' '));
                }
            }
        });

        // Create a data URL from the SVG
        const svgData = new XMLSerializer().serializeToString(svgClone);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);

        // Create download link
        const downloadLink = document.createElement('a');
        downloadLink.href = svgUrl;
        downloadLink.download = `${pattern}.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        // Clean up
        URL.revokeObjectURL(svgUrl);
    };

    // Animation effect for cellular automata
    useEffect(() => {
        if (pattern === 'cellular-automata' && isPlaying && caGrid) {
            animationIntervalRef.current = setInterval(() => {
                setCaGrid(prevGrid => {
                    if (!prevGrid) return null;
                    return evolveCAGrid(prevGrid);
                });
            }, 200); // Update every 200ms

            return () => {
                if (animationIntervalRef.current) {
                    clearInterval(animationIntervalRef.current);
                    animationIntervalRef.current = null;
                }
            };
        } else {
            if (animationIntervalRef.current) {
                clearInterval(animationIntervalRef.current);
                animationIntervalRef.current = null;
            }
        }
    }, [pattern, isPlaying, caGrid]);

    // Reset CA grid when pattern changes, dim changes, or seed changes
    useEffect(() => {
        if (pattern !== 'cellular-automata') {
            setCaGrid(null);
            setIsPlaying(false);
        } else if (caGrid) {
            const expectedCols = Math.floor(width / dim);
            const expectedRows = Math.floor(height / dim);
            const actualCols = caGrid[0]?.length || 0;
            const actualRows = caGrid.length || 0;
            if (expectedCols !== actualCols || expectedRows !== actualRows) {
                // Grid dimensions changed, reset
                setCaGrid(null);
                setIsPlaying(false);
            }
        }
    }, [pattern, dim, width, height, seed, caGrid]);

    // Regenerate grid when seed changes (if not playing)
    useEffect(() => {
        if (pattern === 'cellular-automata' && !isPlaying) {
            setCaGrid(null); // Reset to trigger regeneration with new seed
        }
    }, [seed, pattern, isPlaying]);

    // Generate SVG when parameters change
    useEffect(() => {
        generateSVG(svgRef.current);
        generateSVG(fullscreenSvgRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pattern, ratio, cellSize, width, height, waves, windowSize, dim, speed, seed, caGrid]);

    // Generate SVG when fullscreen opens
    useEffect(() => {
        if (isFullscreen && fullscreenSvgRef.current) {
            // Small delay to ensure the ref is attached and DOM is ready
            const timer = setTimeout(() => {
                generateSVG(fullscreenSvgRef.current);
            }, 10);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFullscreen, pattern, ratio, cellSize, width, height, waves, windowSize, dim, speed]);

    // Handle escape key to close fullscreen
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isFullscreen]);

    return (
        <div>
            {/* Header */}
            <header className="flex items-center justify-end mb-8 text-right">
                <Link href="/" className="text-sm font-sans transition-transform duration-200 hover:underline">
                    yashbonde.com
                </Link>
            </header>

            <style dangerouslySetInnerHTML={{
                __html: `
                input[type="range"] {
                    -webkit-appearance: none;
                    appearance: none;
                }
                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    background: #000;
                    border-radius: 50%;
                    cursor: pointer;
                }
                input[type="range"]::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    background: #000;
                    border-radius: 50%;
                    cursor: pointer;
                    border: none;
                }
            `}} />

            <div className="flex flex-col gap-4">
                {/* Canvas Container */}
                <div className="flex flex-col items-center gap-2">
                    <div className="border border-gray-200 bg-paper w-full max-w-full overflow-hidden">
                        <svg
                            ref={svgRef}
                            viewBox={`0 0 ${width} ${height}`}
                            xmlns="http://www.w3.org/2000/svg"
                            className="block w-full h-auto"
                            preserveAspectRatio="xMidYMid meet"
                        />
                    </div>
                    <button
                        onClick={() => setIsFullscreen(true)}
                        className="px-3 py-1.5 bg-gray-100 text-ink rounded font-medium hover:bg-gray-200 transition-colors text-sm flex items-center gap-2"
                    >
                        <Maximize2 className="w-4 h-4" />
                        Full Screen
                    </button>
                </div>

                {/* Controls */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="space-y-4 mb-4">
                        <h3 className="text-xl font-serif font-mono text-ink mb-4">svjeez</h3>

                        {/* Common Controls */}
                        <div>
                            <div className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">Common</div>
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                {/* Pattern Dropdown */}
                                <div>
                                    <label htmlFor="pattern" className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
                                        Pattern
                                    </label>
                                    <select
                                        id="pattern"
                                        value={pattern}
                                        onChange={(e) => setPattern(e.target.value as PatternType)}
                                        className="w-full px-2 py-1.5 border border-gray-300 rounded bg-white text-ink text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                    >
                                        {getAvailablePatterns().map((p) => (
                                            <option key={p} value={p}>
                                                {p === 'cellular-automata' ? 'Cellular Automata' : p.charAt(0).toUpperCase() + p.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Ratio Dropdown */}
                                <div>
                                    <label htmlFor="ratio" className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
                                        Ratio
                                    </label>
                                    <select
                                        id="ratio"
                                        value={ratio}
                                        onChange={(e) => setRatio(e.target.value)}
                                        className="w-full px-2 py-1.5 border border-gray-300 rounded bg-white text-ink text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                    >
                                        {getRatioNames().map((name) => (
                                            <option key={name} value={name}>
                                                {RATIOS[name].name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                        </div>

                        {/* Pattern-Specific Controls */}
                        {pattern === 'maze' && (
                            <div>
                                <div className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">Maze</div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Cell Size Control */}
                                    <div>
                                        <label htmlFor="scale" className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
                                            Cell Size
                                        </label>
                                        <input
                                            type="range"
                                            id="scale"
                                            min="8"
                                            max="50"
                                            step="1"
                                            value={cellSize}
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value);
                                                setCellSize(Math.max(8, val));
                                            }}
                                            className="w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer"
                                            style={{
                                                background: `linear-gradient(to right, #000 0%, #000 ${((cellSize - 8) / 42) * 100}%, #e0e0e0 ${((cellSize - 8) / 42) * 100}%, #e0e0e0 100%)`
                                            }}
                                        />
                                        <div className="text-xs text-gray-500 mt-0.5">{cellSize}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sine Wave Pattern Controls */}
                        {pattern === 'sine' && (
                            <div>
                                <div className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">Sine Waves</div>

                                {/* Window Size Control */}
                                <div className="mb-3 pb-3 border-b border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <label htmlFor="windowSize" className="text-xs font-medium text-gray-600 w-24 flex-shrink-0 uppercase tracking-wide">
                                            Window Size
                                        </label>
                                        <input
                                            type="range"
                                            id="windowSize"
                                            min="0.1"
                                            max="10"
                                            step="0.1"
                                            value={windowSize}
                                            onChange={(e) => setWindowSize(parseFloat(e.target.value))}
                                            className="flex-1 h-1 bg-gray-200 rounded appearance-none cursor-pointer"
                                            style={{
                                                background: `linear-gradient(to right, #000 0%, #000 ${((windowSize - 0.1) / 9.9) * 100}%, #e0e0e0 ${((windowSize - 0.1) / 9.9) * 100}%, #e0e0e0 100%)`
                                            }}
                                        />
                                        <div className="text-xs text-gray-500 w-12 text-right flex-shrink-0">{windowSize.toFixed(1)}</div>
                                    </div>
                                </div>

                                <div className="space-y-0 max-h-96 overflow-y-auto">
                                    {waves.map((wave, index) => (
                                        <div key={index} className="flex items-center gap-0.5 py-0 border-b border-gray-100">
                                            <div className="text-xs font-medium text-gray-600 w-10 flex-shrink-0">Wave {index + 1}</div>

                                            {/* Amplitude Control */}
                                            <div className="flex items-center gap-0.5 flex-1 min-w-0">
                                                <label htmlFor={`amplitude-${index}`} className="text-xs text-gray-600 w-10 flex-shrink-0">AMP</label>
                                                <input
                                                    type="range"
                                                    id={`amplitude-${index}`}
                                                    min="10"
                                                    max="150"
                                                    step="1"
                                                    value={wave.amplitude}
                                                    onChange={(e) => {
                                                        const newWaves = [...waves];
                                                        newWaves[index].amplitude = parseFloat(e.target.value);
                                                        setWaves(newWaves);
                                                    }}
                                                    className="flex-1 h-1 bg-gray-200 rounded appearance-none cursor-pointer"
                                                    style={{
                                                        background: `linear-gradient(to right, #000 0%, #000 ${((wave.amplitude - 10) / 140) * 100}%, #e0e0e0 ${((wave.amplitude - 10) / 140) * 100}%, #e0e0e0 100%)`
                                                    }}
                                                />
                                                <div className="text-xs text-gray-500 w-7 text-right flex-shrink-0">{Math.round(wave.amplitude)}</div>
                                            </div>

                                            {/* Phase Shift Control */}
                                            <div className="flex items-center gap-0.5 flex-1 min-w-0">
                                                <label htmlFor={`phase-${index}`} className="text-xs text-gray-600 w-10 flex-shrink-0">PHASE</label>
                                                <input
                                                    type="range"
                                                    id={`phase-${index}`}
                                                    min="0"
                                                    max={Math.PI * 2}
                                                    step="0.01"
                                                    value={wave.phaseShift}
                                                    onChange={(e) => {
                                                        const newWaves = [...waves];
                                                        newWaves[index].phaseShift = parseFloat(e.target.value);
                                                        setWaves(newWaves);
                                                    }}
                                                    className="flex-1 h-1 bg-gray-200 rounded appearance-none cursor-pointer"
                                                    style={{
                                                        background: `linear-gradient(to right, #000 0%, #000 ${(wave.phaseShift / (Math.PI * 2)) * 100}%, #e0e0e0 ${(wave.phaseShift / (Math.PI * 2)) * 100}%, #e0e0e0 100%)`
                                                    }}
                                                />
                                                <div className="text-xs text-gray-500 w-7 text-right flex-shrink-0">{wave.phaseShift.toFixed(2)}</div>
                                            </div>

                                            {/* Line Width Control */}
                                            <div className="flex items-center gap-0.5 flex-1 min-w-0">
                                                <label htmlFor={`linewidth-${index}`} className="text-xs text-gray-600 w-10 flex-shrink-0">WIDTH</label>
                                                <input
                                                    type="range"
                                                    id={`linewidth-${index}`}
                                                    min="0.5"
                                                    max="10"
                                                    step="0.1"
                                                    value={wave.lineWidth}
                                                    onChange={(e) => {
                                                        const newWaves = [...waves];
                                                        newWaves[index].lineWidth = parseFloat(e.target.value);
                                                        setWaves(newWaves);
                                                    }}
                                                    className="flex-1 h-1 bg-gray-200 rounded appearance-none cursor-pointer"
                                                    style={{
                                                        background: `linear-gradient(to right, #000 0%, #000 ${((wave.lineWidth - 0.5) / 9.5) * 100}%, #e0e0e0 ${((wave.lineWidth - 0.5) / 9.5) * 100}%, #e0e0e0 100%)`
                                                    }}
                                                />
                                                <div className="text-xs text-gray-500 w-7 text-right flex-shrink-0">{wave.lineWidth.toFixed(1)}</div>
                                            </div>

                                            {/* Multiply With Control */}
                                            {waves.length > 1 && (
                                                <div className="flex items-center gap-1 flex-shrink-0 ml-1">
                                                    <span className="text-xs text-gray-600">×</span>
                                                    <div className="flex items-center gap-0.5">
                                                        {waves.map((otherWave, otherIndex) => {
                                                            if (otherIndex === index) return null;
                                                            const isChecked = wave.multiplyWith?.includes(otherIndex) || false;
                                                            return (
                                                                <label
                                                                    key={otherIndex}
                                                                    className="flex items-center cursor-pointer"
                                                                    title={`Multiply with Wave ${otherIndex + 1}`}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={isChecked}
                                                                        onChange={(e) => {
                                                                            const newWaves = [...waves];
                                                                            const currentMultiply = newWaves[index].multiplyWith || [];
                                                                            if (e.target.checked) {
                                                                                newWaves[index].multiplyWith = [...currentMultiply, otherIndex];
                                                                            } else {
                                                                                newWaves[index].multiplyWith = currentMultiply.filter(i => i !== otherIndex);
                                                                            }
                                                                            setWaves(newWaves);
                                                                        }}
                                                                        className="w-3 h-3 cursor-pointer"
                                                                    />
                                                                    <span className="text-xs text-gray-500 ml-0.5">{otherIndex + 1}</span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            setWaves([...waves, { amplitude: 50, phaseShift: 0, lineWidth: 2 }]);
                                        }}
                                        className="w-full px-3 py-2 bg-gray-100 text-ink rounded font-medium hover:bg-gray-200 transition-colors text-sm mt-2"
                                    >
                                        Add Wave
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Cellular Automata Pattern Controls */}
                        {pattern === 'cellular-automata' && (
                            <div>
                                <div className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">Cellular Automata</div>
                                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                                    {/* Speed Control */}
                                    <div>
                                        <label htmlFor="speed" className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
                                            Speed
                                        </label>
                                        <input
                                            type="range"
                                            id="speed"
                                            min="1"
                                            max="20"
                                            step="1"
                                            value={speed}
                                            onChange={(e) => setSpeed(parseInt(e.target.value))}
                                            className="w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer"
                                            style={{
                                                background: `linear-gradient(to right, #000 0%, #000 ${((speed - 1) / 19) * 100}%, #e0e0e0 ${((speed - 1) / 19) * 100}%, #e0e0e0 100%)`
                                            }}
                                        />
                                        <div className="text-xs text-gray-500 mt-0.5">{speed}</div>
                                    </div>

                                    {/* Dim Control */}
                                    <div>
                                        <label htmlFor="dim" className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
                                            Dim
                                        </label>
                                        <input
                                            type="range"
                                            id="dim"
                                            min="10"
                                            max="40"
                                            step="1"
                                            value={dim}
                                            onChange={(e) => setDim(parseInt(e.target.value))}
                                            className="w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer"
                                            style={{
                                                background: `linear-gradient(to right, #000 0%, #000 ${((dim - 10) / 30) * 100}%, #e0e0e0 ${((dim - 10) / 30) * 100}%, #e0e0e0 100%)`
                                            }}
                                        />
                                        <div className="text-xs text-gray-500 mt-0.5">{dim}</div>
                                    </div>

                                    {/* Seed Control */}
                                    <div>
                                        <label htmlFor="seed" className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
                                            Seed
                                        </label>
                                        <input
                                            type="range"
                                            id="seed"
                                            min="0"
                                            max="1000000"
                                            step="1000"
                                            value={seed}
                                            onChange={(e) => setSeed(parseInt(e.target.value))}
                                            className="w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer"
                                            style={{
                                                background: `linear-gradient(to right, #000 0%, #000 ${(seed / 1000000) * 100}%, #e0e0e0 ${(seed / 1000000) * 100}%, #e0e0e0 100%)`
                                            }}
                                        />
                                        <div className="text-xs text-gray-500 mt-0.5">{seed.toLocaleString()}</div>
                                    </div>

                                    {/* New Button */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
                                            New
                                        </label>
                                        <button
                                            onClick={() => {
                                                setIsPlaying(false);
                                                setSeed(Math.floor(Math.random() * 1000000));
                                                setCaGrid(null); // Reset grid to trigger regeneration
                                                generateSVG(svgRef.current);
                                                generateSVG(fullscreenSvgRef.current);
                                            }}
                                            className="w-full px-3 py-2 bg-gray-100 text-ink rounded font-medium hover:bg-gray-200 transition-colors text-sm"
                                        >
                                            New
                                        </button>
                                    </div>

                                    {/* Step Button */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
                                            Step
                                        </label>
                                        <button
                                            onClick={() => {
                                                setIsPlaying(false);
                                                if (caGrid) {
                                                    setCaGrid(evolveCAGrid(caGrid));
                                                } else {
                                                    // Initialize grid if not already initialized
                                                    const initialGrid = initializeCAGrid(seed);
                                                    let evolvedGrid = initialGrid;
                                                    for (let gen = 0; gen < speed; gen++) {
                                                        evolvedGrid = evolveCAGrid(evolvedGrid);
                                                    }
                                                    setCaGrid(evolvedGrid);
                                                }
                                                generateSVG(svgRef.current);
                                                generateSVG(fullscreenSvgRef.current);
                                            }}
                                            className="w-full px-3 py-2 bg-gray-100 text-ink rounded font-medium hover:bg-gray-200 transition-colors text-sm"
                                        >
                                            Step
                                        </button>
                                    </div>

                                    {/* Play Button */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
                                            Play
                                        </label>
                                        <button
                                            onClick={() => {
                                                if (!caGrid) {
                                                    // Initialize grid if not already initialized
                                                    const initialGrid = initializeCAGrid(seed);
                                                    let evolvedGrid = initialGrid;
                                                    for (let gen = 0; gen < speed; gen++) {
                                                        evolvedGrid = evolveCAGrid(evolvedGrid);
                                                    }
                                                    setCaGrid(evolvedGrid);
                                                    generateSVG(svgRef.current);
                                                    generateSVG(fullscreenSvgRef.current);
                                                }
                                                setIsPlaying(true);
                                            }}
                                            disabled={isPlaying}
                                            className="w-full px-3 py-2 bg-gray-100 text-ink rounded font-medium hover:bg-gray-200 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            <Play className="w-4 h-4" />
                                            Play
                                        </button>
                                    </div>

                                    {/* Pause Button */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
                                            Pause
                                        </label>
                                        <button
                                            onClick={() => {
                                                setIsPlaying(false);
                                            }}
                                            disabled={!isPlaying}
                                            className="w-full px-3 py-2 bg-gray-100 text-ink rounded font-medium hover:bg-gray-200 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            <Pause className="w-4 h-4" />
                                            Pause
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Add more pattern-specific sections here as patterns are added */}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={randomize}
                            className="flex-1 px-3 py-2 bg-gray-100 text-ink rounded font-medium hover:bg-gray-200 transition-colors text-sm"
                        >
                            Random
                        </button>
                        <button
                            onClick={downloadSVG}
                            className="flex-1 px-3 py-2 bg-ink text-paper rounded font-medium hover:bg-gray-800 transition-colors text-sm"
                        >
                            Download
                        </button>
                    </div>
                </div>
            </div>

            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center p-4">
                        <button
                            onClick={() => setIsFullscreen(false)}
                            className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                            aria-label="Close fullscreen"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="w-full h-full flex items-center justify-center">
                            <svg
                                ref={fullscreenSvgRef}
                                viewBox={`0 0 ${width} ${height}`}
                                xmlns="http://www.w3.org/2000/svg"
                                className="block w-full h-full max-w-full max-h-full"
                                preserveAspectRatio="xMidYMid meet"
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
