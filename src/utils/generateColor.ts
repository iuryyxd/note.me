const colors = [
  'opaqueLightYellow',
  'opaqueRedOrange',
  'opaqueLilac',
  'opaqueGreenCyan',
  'opaqueLightCyan',
];

export function generateNoteColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
