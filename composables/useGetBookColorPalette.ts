import { BookColorSchema, defaultBookPalette } from "~/types/BookColorTypes";
import type { BookColor } from "~/types/BookColorTypes";

import Vibrant from "node-vibrant";

export default async function (id = "kLAoswEACAAJ"): Promise<BookColor> {
  const imageLink = `http://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`;
  console.log(imageLink);
  const getPalette = async () => {
    return await Vibrant.from(imageLink).getPalette();
  };
  const palette = await getPalette();

  const validatedColors = BookColorSchema.safeParse(palette);

  if (validatedColors.success) {
    console.log(validatedColors.success);
    return validatedColors.data;
  } else {
    console.error(validatedColors.error);
    return defaultBookPalette;
  }
}
