import { FORMAT, directoryToUrlMap } from "../../utils/url";

const pairs: { formatA: FORMAT; formatB: FORMAT }[] = [
  { formatA: "avif", formatB: "webp" },
  { formatA: "avif", formatB: "jpg" },
  { formatA: "webp", formatB: "jpg" },
];

const images = [1, 2, 3];
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
