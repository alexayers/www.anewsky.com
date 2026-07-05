// Shared types for the game.
export type ObjectType = "item" | "hitbox" | "itembox";
export type ClickCallback = (x: number, y: number) => void;
export type RenderCallback = () => void;
export type OneTimeCallback = () => void;
