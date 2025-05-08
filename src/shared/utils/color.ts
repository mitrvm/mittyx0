type IsLightOpts = {
  threshold?: number;
};

export function isLightColor(
  hex: string,
  { threshold = 205 }: IsLightOpts = {},
): boolean {
  let c = hex.replace(/^#/, '');

  if (c.length === 3) {
    c = c
      .split('')
      .map((ch) => ch + ch)
      .join('');
  }
  if (c.length !== 6) {
    return false;
  }

  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > threshold;
}
