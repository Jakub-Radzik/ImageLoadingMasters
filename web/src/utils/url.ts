// https://images-loading-bucket-eu.s3.eu-central-1.amazonaws.com/AVIF_LOSSLESS/1_w1920_lvl0_lossless.avif

const BUCKET_URL =
  "https://images-loading-bucket-eu.s3.eu-central-1.amazonaws.com";

export type FORMAT =
  | "avif"
  | "webp"
  | "jpg"
  | "png"
  | "ref"; // ! ref files are png

export type Compression = 'lossy' | 'lossless'

type GenUrlFunction = (
  img: number,
  width: number,
  q_l: number,
  c: Compression,
  interlaced?: boolean
) => string;

const generateAvifUrl: GenUrlFunction = (
  img,
  width,
  q_l,
  c,
  interlaced
) => {
  const q_l_key = c === 'lossless' ? 'lvl' : 'q' ;
  return `${BUCKET_URL}/AVIF_${c.toUpperCase()}/${img}_w${width}_${q_l_key}${q_l}_${c}.avif`;
}

const generateWebpUrl: GenUrlFunction = (
  img: number,
  width: number,
  q_l: number,
  c,
  interlaced?: boolean
) => `${BUCKET_URL}/WEBP_${c.toUpperCase()}/${img}_w${width}_q${q_l}_${c}.webp`;

const generateJpgUrl: GenUrlFunction = (
  img: number,
  width: number,
  q_l: number,
  c,
  interlaced?: boolean
) =>
  `${BUCKET_URL}/JPG/${img}_w${width}_q${q_l}_lossy${
    interlaced ? "_progressive" : ""
  }.jpg`;

const generatePngUrl: GenUrlFunction = (
  img: number,
  width: number,
  q_l: number,
  c,
  interlaced?: boolean
) =>
  `${BUCKET_URL}/PNG/${img}_w${width}_lvl${q_l}${
    interlaced ? "_interlaced" : ""
  }.png`;

const generateReferenceFileUrl: GenUrlFunction = (
  img: number,
  width: number,
  q_l: number,
  type,
  interlaced?: boolean
) => `${BUCKET_URL}/REFERENCE_FILE/${img}_w${width}.png`;

// There is a chance to make it one function instead of map and functions
// But for now it is not a concern - If it works dont touch
export const directoryToUrlMap: Record<FORMAT, GenUrlFunction> = {
  'avif': generateAvifUrl,
  'webp': generateWebpUrl,
  'jpg': generateJpgUrl,
  'png': generatePngUrl,
  'ref': generateReferenceFileUrl,
};
