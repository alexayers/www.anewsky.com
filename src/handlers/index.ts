// Aggregates every per-room handler module into flat lookup tables keyed by
// handler id (e.g. "room1.brokenCardreader"). Handler files (./room*.ts) are
// auto-discovered, so adding a room's behavior needs no edit here.
import type { ClickHandler, RenderHandler, OneTimeHandler } from "./types";

interface HandlerModule {
  clickHandlers?: Record<string, ClickHandler>;
  renderHandlers?: Record<string, RenderHandler>;
  oneTimeHandlers?: Record<string, OneTimeHandler>;
}

const modules = import.meta.glob("./room*.ts", { eager: true }) as Record<string, HandlerModule>;

export const clickHandlers: Record<string, ClickHandler> = {};
export const renderHandlers: Record<string, RenderHandler> = {};
export const oneTimeHandlers: Record<string, OneTimeHandler> = {};

for (const mod of Object.values(modules)) {
  if (mod.clickHandlers) Object.assign(clickHandlers, mod.clickHandlers);
  if (mod.renderHandlers) Object.assign(renderHandlers, mod.renderHandlers);
  if (mod.oneTimeHandlers) Object.assign(oneTimeHandlers, mod.oneTimeHandlers);
}
