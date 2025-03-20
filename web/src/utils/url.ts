// https://images-loading-bucket-eu.s3.eu-central-1.amazonaws.com/AVIF_LOSSLESS/1_w1920_lvl0_lossless.avif

const BUCKET_URL =
  "https://images-loading-bucket-eu.s3.eu-central-1.amazonaws.com";

export type DIRECTORY =
  | "AVIF_LOSSLESS"
  | "AVIF_LOSSY"
  | "WEBP_LOSSLESS"
  | "WEBP_LOSSY"
  | "JPG"
  | "PNG"
  | "REFERENCE_FILE";

type GenUrlFunction = (
  img: number,
  width: number,
  q_l: number,
  interlaced?: boolean
) => string;

const generateAvifLosslessUrl = (
  img: number,
  width: number,
  q_l: number,
  interlaced?: boolean
) => `${BUCKET_URL}/AVIF_LOSSLESS/${img}_w${width}_lvl${q_l}_lossless.avif`;

const generateAvifLossyUrl = (
  img: number,
  width: number,
  q_l: number,
  interlaced?: boolean
) => `${BUCKET_URL}/AVIF_LOSSY/${img}_w${width}_q${q_l}_lossy.avif`;

const generateWebpLosslessUrl = (
  img: number,
  width: number,
  q_l: number,
  interlaced?: boolean
) => `${BUCKET_URL}/WEBP_LOSSLESS/${img}_w${width}_q${q_l}_lossless.webp`;

const generateWebpLossyUrl = (
  img: number,
  width: number,
  q_l: number,
  interlaced?: boolean
) => `${BUCKET_URL}/WEBP_LOSSLESS/${img}_w${width}_q${q_l}_lossy.webp`;

const generateJpgUrl = (
  img: number,
  width: number,
  q_l: number,
  interlaced?: boolean
) =>
  `${BUCKET_URL}/JPG/${img}_w${width}_q${q_l}_lossy${
    interlaced ? "_progressive" : ""
  }.jpg`;

const generatePngUrl = (
  img: number,
  width: number,
  q_l: number,
  interlaced?: boolean
) =>
  `${BUCKET_URL}/PNG/${img}_w${width}_lvl${q_l}${
    interlaced ? "_interlaced" : ""
  }.png`;

const generateReferenceFileUrl = (
  img: number,
  width: number,
  q_l: number,
  interlaced?: boolean
) => `${BUCKET_URL}/REFERENCE_FILE/${img}_w${width}.png`;

export const directoryToUrlMap: Record<DIRECTORY, GenUrlFunction> = {
  AVIF_LOSSLESS: generateAvifLosslessUrl,
  AVIF_LOSSY: generateAvifLossyUrl,
  WEBP_LOSSLESS: generateWebpLosslessUrl,
  WEBP_LOSSY: generateWebpLossyUrl,
  JPG: generateJpgUrl,
  PNG: generatePngUrl,
  REFERENCE_FILE: generateReferenceFileUrl,
};
