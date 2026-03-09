/**
 * /src/theme/colors.ts
 * Centralized color tokens — never hardcode hex values in components.
 */

export const COLORS = {
  background:       '#0A0A0A',
  surface:          '#141414',
  surfaceElevated:  '#1C1C1C',
  border:           '#2A2A2A',
  white:            '#FFFFFF',
  textPrimary:      '#F0F0F0',
  textSecondary:    '#AAAAAA',
  textMuted:        '#666666',
  accent:           '#FF4D00',
  accentLight:      '#FF7A3D',
  accentDark:       '#CC3D00',
  success:          '#52B788',
  warning:          '#F4A261',
  error:            '#E63946',
} as const;

export type ColorKey = keyof typeof COLORS;
export default COLORS;
