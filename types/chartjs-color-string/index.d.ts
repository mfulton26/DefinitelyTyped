// Type definitions for chartjs-color-string 0.6
// Project: https://github.com/chartjs/chartjs-color-string#readme
// Definitions by: Ankan Bhattacharya <https://github.com/Ankan002>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export function getRgba(colorString?: string): number[] | undefined;
export function getHsla(colorString?: string): number[] | undefined;
export function getHwb(colorString?: string): number[] | undefined;
export function getRgb(colorString?: string): number[] | undefined;
export function getHsl(colorString?: string): number[] | undefined;
export function getAlpha(colorString?: string): number | undefined;

export function hexString(rgba: number[], a?: number): string;
export function rgbString(rgba: number[], alpha?: number): string;
export function rgbaString(rgba: number[], alpha?: number): string;
export function percentString(rgba: number[], alpha?: number): string;
export function percentaString(rgba: number[], alpha?: number): string;
export function hslString(hsla: number[], alpha?: number): string;
export function hslaString(hsla: number[], alpha?: number): string;
export function hwbString(hwb: number[], alpha?: number): string;
export function keyword(rgb: number[]): string;
