// Thin DOM helpers replacing the old jQuery calls for the title/subtitle
// overlays and the canvas cursor.

function byId(id: string): HTMLElement | null {
  return document.getElementById(id);
}

export function setSubtitleText(text: string): void {
  const el = byId("subtitle");
  if (el) el.textContent = text;
}

export function setMaintitleText(text: string): void {
  const el = byId("maintitle");
  if (el) el.textContent = text;
}

export function setSubtitleVisible(visible: boolean): void {
  const el = byId("subtitle");
  if (el) el.style.display = visible ? "block" : "none";
}

export function setMaintitleVisible(visible: boolean): void {
  const el = byId("maintitle");
  if (el) el.style.display = visible ? "block" : "none";
}

export function hideTitles(): void {
  setSubtitleVisible(false);
  setMaintitleVisible(false);
}

export function setCursor(cursor: string): void {
  const canvas = byId("Viewport");
  if (canvas) canvas.style.cursor = cursor;
}
