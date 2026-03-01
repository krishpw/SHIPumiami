/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { VoxelData } from '../types';
import { COLORS, CONFIG } from './voxelConstants';

// Helper to prevent overlapping voxels
function setBlock(map: Map<string, VoxelData>, x: number, y: number, z: number, color: number) {
    const rx = Math.round(x);
    const ry = Math.round(y);
    const rz = Math.round(z);
    const key = `${rx},${ry},${rz}`;
    map.set(key, { x: rx, y: ry, z: rz, color });
}

function generateSphere(map: Map<string, VoxelData>, cx: number, cy: number, cz: number, r: number, col: number, sy = 1) {
    const r2 = r * r;
    const xMin = Math.floor(cx - r);
    const xMax = Math.ceil(cx + r);
    const yMin = Math.floor(cy - r * sy);
    const yMax = Math.ceil(cy + r * sy);
    const zMin = Math.floor(cz - r);
    const zMax = Math.ceil(cz + r);

    for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
            for (let z = zMin; z <= zMax; z++) {
                const dx = x - cx;
                const dy = (y - cy) / sy;
                const dz = z - cz;
                if (dx * dx + dy * dy + dz * dz <= r2) {
                    setBlock(map, x, y, z, col);
                }
            }
        }
    }
}

function generateTree(map: Map<string, VoxelData>, x: number, z: number, yBase: number) {
    // Trunk
    for (let i = 0; i < 4; i++) setBlock(map, x, yBase + i, z, COLORS.WOOD);
    // Leaves
    generateSphere(map, x, yBase + 4, z, 2.5, COLORS.FOLIAGE_GREEN);
}

function generatePalmTree(map: Map<string, VoxelData>, x: number, z: number, yBase: number) {
    // Trunk: Thin, slightly curved
    const height = 6 + Math.floor(Math.random() * 4);
    let currentX = x;
    let currentZ = z;
    
    for (let i = 0; i < height; i++) {
        setBlock(map, Math.round(currentX), yBase + i, Math.round(currentZ), COLORS.WOOD);
        // Slight curve
        if (i > 2 && Math.random() > 0.7) {
            currentX += (Math.random() - 0.5) * 0.5;
            currentZ += (Math.random() - 0.5) * 0.5;
        }
    }
    
    const topY = yBase + height;
    const topX = Math.round(currentX);
    const topZ = Math.round(currentZ);

    // Leaves: Radial, outward curving
    const fronds = 5;
    for(let f=0; f<fronds; f++) {
        const angle = (f / fronds) * Math.PI * 2;
        for(let d=1; d<=4; d++) {
            const fx = topX + Math.cos(angle) * d;
            const fz = topZ + Math.sin(angle) * d;
            // Curve down
            const fy = topY - (d * 0.3); 
            setBlock(map, Math.round(fx), Math.round(fy), Math.round(fz), COLORS.UMIAMI_GREEN);
        }
    }
}

export const Generators = {
    'University of Miami': (): VoxelData[] => {
        const map = new Map<string, VoxelData>();
        const FLOOR = CONFIG.FLOOR_Y + 1;
        
        // --- Terrain & Lake Osceola ---
        for (let z = -50; z <= 50; z++) {
            for (let x = -50; x <= 50; x++) {
                const dist = Math.sqrt(x*x + z*z);
                const angle = Math.atan2(z, x);
                
                // Lake Osceola (Central, slightly irregular)
                const lakeRadius = 15 + Math.sin(angle * 3) * 2; 
                
                if (dist < lakeRadius) {
                    // Water Gradient
                    const depth = lakeRadius - dist;
                    const waterColor = depth > 5 ? COLORS.UMIAMI_TEAL : COLORS.WATER;
                    setBlock(map, x, FLOOR - 1, z, waterColor);
                    
                    // Fountain in center
                    if (dist < 2 && Math.random() > 0.6) {
                         setBlock(map, x, FLOOR + Math.random() * 12, z, COLORS.WHITE);
                    }
                } else {
                    // Ground Cover (Lime Green)
                    setBlock(map, x, FLOOR, z, COLORS.UMIAMI_LIME);
                }
            }
        }

        // --- Hardscaping (Pathways) ---
        // Radial paths from center + Ring path around lake
        for (let z = -50; z <= 50; z++) {
            for (let x = -50; x <= 50; x++) {
                const dist = Math.sqrt(x*x + z*z);
                if (dist < 15) continue; // Don't overwrite lake
                
                // Ring path
                if (dist > 15 && dist < 22) {
                    setBlock(map, x, FLOOR, z, COLORS.UMIAMI_SAND);
                }
                
                // Radial paths at 0, 90, 180, 270 degrees
                if ((Math.abs(x) < 3 || Math.abs(z) < 3) && dist > 15) {
                     setBlock(map, x, FLOOR, z, COLORS.BRICK);
                }
            }
        }

        // --- Primary Structures (Curved Masses) ---
        const quadrants = [
            { startAngle: 0.2, endAngle: 1.3 }, // NE
            { startAngle: 1.7, endAngle: 2.9 }, // NW
            { startAngle: 3.3, endAngle: 4.5 }, // SW
            { startAngle: 4.9, endAngle: 6.0 }  // SE
        ];

        quadrants.forEach(q => {
            const innerR = 24;
            const outerR = 36;
            const height = 12;
            
            for (let r = innerR; r <= outerR; r++) {
                const circumference = 2 * Math.PI * r;
                const steps = Math.ceil(circumference * 1.5); 
                
                for (let i = 0; i < steps; i++) {
                    const theta = (i / steps) * 2 * Math.PI;
                    if (theta >= q.startAngle && theta <= q.endAngle) {
                        const x = Math.round(r * Math.cos(theta));
                        const z = Math.round(r * Math.sin(theta));
                        
                        // Pillars (Base Layer)
                        if (r % 5 === 0 && i % 8 === 0) {
                             for(let y=0; y<3; y++) setBlock(map, x, FLOOR + y, z, COLORS.DARK_CONCRETE);
                        }
                        
                        // Main Building Mass
                        for (let y = 3; y < height; y++) {
                            const currentY = FLOOR + y;
                            // Facade Pattern: Vertical Stripes
                            // Use angle to determine stripe
                            const stripeIndex = Math.floor(theta * 12);
                            const isStripe = stripeIndex % 2 === 0;
                            const color = isStripe ? COLORS.WHITE : COLORS.UMIAMI_TERRACOTTA;
                            
                            // Windows
                            if (y > 4 && y < height - 2 && i % 5 === 0) {
                                setBlock(map, x, currentY, z, COLORS.GLASS);
                            } else {
                                setBlock(map, x, currentY, z, color);
                            }
                        }
                        
                        // Roof
                        setBlock(map, x, FLOOR + height, z, COLORS.WHITE);
                    }
                }
            }
        });

        // --- Peripheral Athletic Fields ---
        const fields = [
            { cx: -42, cz: -42, w: 10, h: 6 },
            { cx: 42, cz: -42, w: 10, h: 6 },
            { cx: -42, cz: 42, w: 10, h: 6 },
            { cx: 42, cz: 42, w: 10, h: 6 },
        ];
        
        fields.forEach(f => {
            for (let x = f.cx - f.w; x <= f.cx + f.w; x++) {
                for (let z = f.cz - f.h; z <= f.cz + f.h; z++) {
                    // Green Field
                    setBlock(map, x, FLOOR, z, COLORS.ATHLETIC_FIELD);
                    // White Lines
                    if (x === f.cx || z === f.cz || x === f.cx - f.w || x === f.cx + f.w || z === f.cz - f.h || z === f.cz + f.h) {
                        setBlock(map, x, FLOOR, z, COLORS.WHITE);
                    }
                }
            }
        });

        // --- Vegetation (Palm Trees) ---
        for (let i = 0; i < 80; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 16 + Math.random() * 32; 
            const tx = Math.cos(angle) * dist;
            const tz = Math.sin(angle) * dist;
            
            // Avoid water and buildings (roughly)
            const isBuilding = (dist > 23 && dist < 37);
            if (dist > 15 && !isBuilding) {
                generatePalmTree(map, Math.round(tx), Math.round(tz), FLOOR);
            }
        }

        return Array.from(map.values());
    },

    TexasAM: (): VoxelData[] => {
        const map = new Map<string, VoxelData>();
        const FLOOR = CONFIG.FLOOR_Y + 1;
        
        // --- Terrain & Grid Layout ---
        // Base Layer: Uniform, low-elevation green voxel planes
        for (let z = -45; z <= 45; z++) {
            for (let x = -45; x <= 45; x++) {
                // Pathways: Intersecting linear arrays forming diagonals and orthogonal walkways
                const isOrthogonal = Math.abs(x) % 12 === 0 || Math.abs(z) % 12 === 0;
                const isDiagonal = Math.abs(x) === Math.abs(z);
                const isPathway = isOrthogonal || isDiagonal;
                
                if (isPathway) {
                    setBlock(map, x, FLOOR, z, COLORS.CONCRETE);
                } else {
                    setBlock(map, x, FLOOR, z, COLORS.FOLIAGE_GREEN);
                }
            }
        }

        // --- Core Infrastructure Asset (Academic Building / Admin) ---
        // Primary Structure: Multi-tiered, high-density tan voxel construction
        const tiers = [
            { w: 16, h: 10, yStart: 0 },
            { w: 12, h: 8, yStart: 10 },
            { w: 8, h: 6, yStart: 18 }
        ];

        tiers.forEach(tier => {
            for (let y = 0; y < tier.h; y++) {
                for (let x = -tier.w; x <= tier.w; x++) {
                    for (let z = -tier.w; z <= tier.w; z++) {
                        const currentY = FLOOR + tier.yStart + y;
                        
                        // Facade: Repetitive grid of recessed dark voxels (windows)
                        const isEdge = Math.abs(x) === tier.w || Math.abs(z) === tier.w;
                        const isWindow = isEdge && (x % 2 !== 0 || z % 2 !== 0) && y > 1 && y < tier.h - 1;
                        
                        if (isWindow) {
                            setBlock(map, x, currentY, z, COLORS.BLACK); // Recessed/Dark
                        } else {
                            setBlock(map, x, currentY, z, COLORS.TAMU_TAN);
                        }
                    }
                }
            }
        });

        // Apex Feature: Stepped z-axis elevation terminating in a low-resolution spherical voxel dome
        const domeY = FLOOR + 24;
        generateSphere(map, 0, domeY, 0, 7, COLORS.TAMU_BEIGE);
        // Add a flag pole or spire
        for(let y=0; y<8; y++) setBlock(map, 0, domeY + 6 + y, 0, COLORS.WHITE);

        // --- Peripheral Developments ---
        // Adjacent Massing: Standardized, rectangular block structures
        const peripherals = [
            { cx: -30, cz: -30, w: 8, h: 12, color: COLORS.TAMU_BEIGE },
            { cx: 30, cz: -30, w: 8, h: 12, color: COLORS.TAMU_BEIGE },
            { cx: -30, cz: 30, w: 8, h: 12, color: COLORS.TAMU_BEIGE },
            { cx: 30, cz: 30, w: 8, h: 12, color: COLORS.TAMU_BEIGE },
            // Side buildings
            { cx: -35, cz: 0, w: 6, h: 10, color: COLORS.DARK_CONCRETE },
            { cx: 35, cz: 0, w: 6, h: 10, color: COLORS.DARK_CONCRETE },
        ];

        peripherals.forEach(b => {
            for (let y = 0; y < b.h; y++) {
                for (let x = b.cx - b.w; x <= b.cx + b.w; x++) {
                    for (let z = b.cz - b.w; z <= b.cz + b.w; z++) {
                        const currentY = FLOOR + y;
                        // Simple window pattern
                        const isEdge = x === b.cx - b.w || x === b.cx + b.w || z === b.cz - b.w || z === b.cz + b.w;
                        if (isEdge && y % 3 === 1 && y > 0) {
                             setBlock(map, x, currentY, z, COLORS.GLASS);
                        } else {
                             setBlock(map, x, currentY, z, b.color);
                        }
                    }
                }
            }
            // Rooftops: HVAC units
            setBlock(map, b.cx - 2, FLOOR + b.h, b.cz - 2, COLORS.DARK_CONCRETE);
            setBlock(map, b.cx + 2, FLOOR + b.h, b.cz + 2, COLORS.DARK_CONCRETE);
            setBlock(map, b.cx, FLOOR + b.h, b.cz, COLORS.WHITE);
        });

        // --- Foliage ---
        // Asymmetrical clusters of dark-green voxels
        for (let i = 0; i < 40; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 15 + Math.random() * 30;
            const tx = Math.cos(angle) * dist;
            const tz = Math.sin(angle) * dist;
            
            // Avoid placing inside buildings roughly
            if (Math.abs(tx) < 18 && Math.abs(tz) < 18) continue;

            generateTree(map, tx, tz, FLOOR);
        }

        return Array.from(map.values());
    },

    Eagle: (): VoxelData[] => {
        const map = new Map<string, VoxelData>();
        // Branch
        for (let x = -8; x < 8; x++) {
            const y = Math.sin(x * 0.2) * 1.5;
            const z = Math.cos(x * 0.1) * 1.5;
            generateSphere(map, x, y, z, 1.8, COLORS.WOOD);
            if (Math.random() > 0.7) generateSphere(map, x, y + 2, z + (Math.random() - 0.5) * 3, 1.5, COLORS.GREEN);
        }
        // Body
        const EX = 0, EY = 2, EZ = 2;
        generateSphere(map, EX, EY + 6, EZ, 4.5, COLORS.DARK, 1.4);
        // Chest
        for (let x = EX - 2; x <= EX + 2; x++) for (let y = EY + 4; y <= EY + 9; y++) setBlock(map, x, y, EZ + 3, COLORS.LIGHT);
        // Wings (Rough approximation)
        for (let x of [-4, -3, 3, 4]) for (let y = EY + 4; y <= EY + 10; y++) for (let z = EZ - 2; z <= EZ + 3; z++) setBlock(map, x, y, z, COLORS.DARK);
        // Tail
        for (let x = EX - 2; x <= EX + 2; x++) for (let y = EY; y <= EY + 4; y++) for (let z = EZ - 5; z <= EZ - 3; z++) setBlock(map, x, y, z, COLORS.WHITE);
        // Head
        const HY = EY + 12, HZ = EZ + 1;
        generateSphere(map, EX, HY, HZ, 2.8, COLORS.WHITE);
        generateSphere(map, EX, HY - 2, HZ, 2.5, COLORS.WHITE);
        // Talons
        [[-2, 0], [-2, 1], [2, 0], [2, 1]].forEach(o => setBlock(map, EX + o[0], EY + o[1], EZ, COLORS.TALON));
        // Beak
        [[0, 1], [0, 2], [1, 1], [-1, 1]].forEach(o => setBlock(map, EX + o[0], HY, HZ + 2 + o[1], COLORS.GOLD));
        setBlock(map, EX, HY - 1, HZ + 3, COLORS.GOLD);
        // Eyes
        [[-1.5, COLORS.BLACK], [1.5, COLORS.BLACK]].forEach(o => setBlock(map, EX + o[0], HY + 0.5, HZ + 1.5, o[1]));
        [[-1.5, COLORS.WHITE], [1.5, COLORS.WHITE]].forEach(o => setBlock(map, EX + o[0], HY + 1.5, HZ + 1.5, o[1]));

        return Array.from(map.values());
    },
    // Retain other generators for rebuilding fun
    Cat: (): VoxelData[] => {
        const map = new Map<string, VoxelData>();
        const CY = CONFIG.FLOOR_Y + 1; const CX = 0, CZ = 0;
        generateSphere(map, CX - 3, CY + 2, CZ, 2.2, COLORS.DARK, 1.2);
        generateSphere(map, CX + 3, CY + 2, CZ, 2.2, COLORS.DARK, 1.2);
        for (let y = 0; y < 7; y++) {
            const r = 3.5 - (y * 0.2);
            generateSphere(map, CX, CY + 2 + y, CZ, r, COLORS.DARK);
            generateSphere(map, CX, CY + 2 + y, CZ + 2, r * 0.6, COLORS.WHITE);
        }
        for (let y = 0; y < 5; y++) {
            setBlock(map, CX - 1.5, CY + y, CZ + 3, COLORS.WHITE); setBlock(map, CX + 1.5, CY + y, CZ + 3, COLORS.WHITE);
            setBlock(map, CX - 1.5, CY + y, CZ + 2, COLORS.WHITE); setBlock(map, CX + 1.5, CY + y, CZ + 2, COLORS.WHITE);
        }
        const CHY = CY + 9;
        generateSphere(map, CX, CHY, CZ, 3.2, COLORS.LIGHT, 0.8);
        [[-2, 1], [2, 1]].forEach(side => {
            setBlock(map, CX + side[0], CHY + 3, CZ, COLORS.DARK); setBlock(map, CX + side[0] * 0.8, CHY + 3, CZ + 1, COLORS.WHITE);
            setBlock(map, CX + side[0], CHY + 4, CZ, COLORS.DARK);
        });
        for (let i = 0; i < 12; i++) {
            const a = i * 0.3, tx = Math.cos(a) * 4.5, tz = Math.sin(a) * 4.5;
            if (tz > -2) { setBlock(map, CX + tx, CY, CZ + tz, COLORS.DARK); setBlock(map, CX + tx, CY + 1, CZ + tz, COLORS.DARK); }
        }
        setBlock(map, CX - 1, CHY + 0.5, CZ + 2.5, COLORS.GOLD); setBlock(map, CX + 1, CHY + 0.5, CZ + 2.5, COLORS.GOLD);
        setBlock(map, CX - 1, CHY + 0.5, CZ + 3, COLORS.BLACK); setBlock(map, CX + 1, CHY + 0.5, CZ + 3, COLORS.BLACK);
        setBlock(map, CX, CHY, CZ + 3, COLORS.TALON);
        return Array.from(map.values());
    }
};