// A NEW SKY — core dimensions.
//
// The game renders at a fixed internal resolution. The playable area is the
// top GAME_HEIGHT pixels; the inventory bar occupies the remainder below it.
// Fullscreen is achieved by scaling the canvas with CSS, so these never change.
export const INTERNAL_WIDTH = 350;
export const INTERNAL_HEIGHT = 400;
export const GAME_HEIGHT = 350;
export const INVENTORY_BAR_HEIGHT = INTERNAL_HEIGHT - GAME_HEIGHT;
export const MAX_INVENTORY = 6;
