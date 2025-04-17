// https://images-loading-bucket-eu.s3.eu-central-1.amazonaws.com/AVIF_LOSSLESS/1_w1920_lvl0_lossless.avif

export const BUCKET_URL =
  "https://images-loading-bucket-eu.s3.eu-central-1.amazonaws.com";

const CDN_HTTP_2_URL = "https://d1jjpdvrylik03.cloudfront.net";
// const CDN_HTTP_3_URL = "https://d31xee1je64268.cloudfront.net";
const CDN_HTTP_3_URL = "https://d2h7ftm59hffcl.cloudfront.net";

export const HTTP_VER_TO_CDN_URL = {
  2: CDN_HTTP_2_URL,
  3: CDN_HTTP_3_URL,
};

const READ_URL = BUCKET_URL;

export type FORMAT = "avif" | "webp" | "jpg" | "png" | "ref"; // ! ref files are png

export type Compression = "lossy" | "lossless";

type GenUrlFunction = (
  img: number,
  width: number,
  q_l: number,
  c: Compression,
  interlaced?: boolean,
  origin?: string
) => string;

const generateAvifUrl: GenUrlFunction = (
  img,
  width,
  q_l,
  c,
  interlaced,
  origin
) => {
  const q_l_key = c === "lossless" ? "lvl" : "q";
  return `${
    origin ? origin : READ_URL
  }/AVIF_${c.toUpperCase()}/${img}_w${width}_${q_l_key}${q_l}_${c}.avif`;
};

const generateWebpUrl: GenUrlFunction = (
  img: number,
  width: number,
  q_l: number,
  c,
  interlaced?: boolean,
  origin?: string
) => {
  const q_l_key = c === "lossless" ? "lvl" : "q";
  return `${
    origin ? origin : READ_URL
  }/WEBP_${c.toUpperCase()}/${img}_w${width}_${q_l_key}${q_l}_${c}.webp`;
};

const generateJpgUrl: GenUrlFunction = (
  img: number,
  width: number,
  q_l: number,
  c,
  interlaced?: boolean,
  origin?: string
) =>
  `${origin ? origin : READ_URL}/JPG/${img}_w${width}_q${q_l}_lossy${
    interlaced ? "_progressive" : ""
  }.jpg`;

const generatePngUrl: GenUrlFunction = (
  img: number,
  width: number,
  q_l: number,
  c,
  interlaced?: boolean,
  origin?: string
) =>
  `${origin ? origin : READ_URL}/PNG/${img}_w${width}_lvl${q_l}${
    interlaced ? "_interlaced" : ""
  }.png`;

const generateReferenceFileUrl: GenUrlFunction = (
  img: number,
  width: number,
  q_l: number,
  type,
  interlaced?: boolean,
  origin?: string
) => `${origin ? origin : READ_URL}/REFERENCE_FILE/${img}_w${width}.png`;

// There is a chance to make it one function instead of map and functions
// But for now it is not a concern - If it works dont touch
export const directoryToUrlMap: Record<FORMAT, GenUrlFunction> = {
  avif: generateAvifUrl,
  webp: generateWebpUrl,
  jpg: generateJpgUrl,
  png: generatePngUrl,
  ref: generateReferenceFileUrl,
};
