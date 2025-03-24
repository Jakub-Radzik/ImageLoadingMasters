import { FORMAT, directoryToUrlMap } from "../../utils/url";

const pairs: { formatA: FORMAT; formatB: FORMAT }[] = [
  { formatA: "avif", formatB: "webp" },
  { formatA: "avif", formatB: "jpg" },
  { formatA: "webp", formatB: "jpg" },
];

const images = [2, 1, 3];
const qualities = [10, 40, 90];

export const settings = pairs.flatMap(({ formatA, formatB }) =>
  qualities.flatMap((quality) =>
    images.map((image) => ({
      formatA,
      formatB,
      quality,
      image,
    }))
  )
);

export type SETTING = (typeof settings)[number];
export type SETTINGS = SETTING[];

export const imageComparisons = settings.map(
  ({ formatA, formatB, quality, image }) => ({
    imageA: directoryToUrlMap[formatA](image, 800, quality, "lossy"),
    imageB: directoryToUrlMap[formatB](image, 800, quality, "lossy"),
    task: "Porównaj jakośc obrazów",
  })
);

export type COMPARISONS = typeof imageComparisons;

const pngPairs: { formatA: FORMAT; formatB: FORMAT }[] = [
  { formatA: "png", formatB: "avif" },
  { formatA: "png", formatB: "webp" },
  { formatA: "png", formatB: "jpg" },
];

export const pngSettings = pngPairs.flatMap(({ formatA, formatB }) =>
  images.map((image) => ({
    formatA,
    formatB,
    quality: 90,
    image,
  }))
);

export const losslessImageComparisons = pngSettings.map(
  ({ formatA, formatB, image }) => ({
    imageA: directoryToUrlMap[formatA](image, 800, 9, "lossless"),
    imageB: directoryToUrlMap[formatB](image, 800, 90, "lossy"),
    task: "Porównaj jakośc obrazów",
  })
);

export const fullSettings = settings.concat(pngSettings);
export const fullImageComparisons = imageComparisons.concat(
  losslessImageComparisons
);
