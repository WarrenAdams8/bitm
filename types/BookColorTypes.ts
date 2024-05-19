import { z } from "zod";

const Swatch = z
  .object({
    _rgb: z.array(z.number()),
    _population: z.number(),
    _hsl: z.array(z.number()),
  })
  .omit({ _population: true, _hsl: true })
  .transform((swatch) => ({
    ...swatch,
    _rgb: `rgb(${swatch._rgb[0]}, ${swatch._rgb[1]}, ${swatch._rgb[2]})`,
  }));

export const BookColorSchema = z.object({
  Vibrant: Swatch,
  DarkVibrant: Swatch,
  LightVibrant: Swatch,
  Muted: Swatch,
  DarkMuted: Swatch,
  LightMuted: Swatch,
});

export type BookColor = z.infer<typeof BookColorSchema>;

export const defaultBookPalette = {
  Vibrant: {
    _rgb: 'rgb(211, 211, 211)',
  },
  DarkVibrant: {
    _rgb: 'rgb(211, 211, 211)',
  },
  LightVibrant: {
    _rgb: 'rgb(211, 211, 211)',
  },
  Muted: {
    _rgb: 'rgb(211, 211, 211)',
  },
  DarkMuted: {
    _rgb: 'rgb(211, 211, 211)',
  },
  LightMuted: {
    _rgb: 'rgb(211, 211, 211)',
  },
};
