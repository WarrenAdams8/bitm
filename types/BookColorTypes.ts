import { z } from "zod";

const Swatch = z
  .object({
    _rgb: z.array(z.number()),
    _population: z.number(),
    _hsl: z.array(z.number()),
  })
  .omit({ _population: true, _hsl: true });

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
    _rgb: [211, 211, 211],
  },
  DarkVibrant: {
    _rgb: [211, 211, 211],
  },
  LightVibrant: {
    _rgb: [211, 211, 211],
  },
  Muted: {
    _rgb: [211, 211, 211],
  },
  DarkMuted: {
    _rgb: [211, 211, 211],
  },
  LightMuted: {
    _rgb: [211, 211, 211],
  },
};
