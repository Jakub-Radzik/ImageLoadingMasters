import { useSearchParams } from "react-router-dom";
import {
  BUCKET_URL,
  Compression,
  directoryToUrlMap,
  FORMAT,
  HTTP_VER_TO_CDN_URL,
} from "../../utils/url";
import { ReferenceImageControls } from "../Controls/ReferenceImageControls";

export const ReferenceImage = ({ httpVer }: { httpVer?: 2 | 3 }) => {
  const [searchParams] = useSearchParams();
  const dir = searchParams.get("dir") as FORMAT | null;
  const img = parseInt(searchParams.get("img") || "0");
  const w = parseInt(searchParams.get("w") || "0");
  const q = parseInt(searchParams.get("q") || "-1");
  const c = (searchParams.get("c") || "lossless") as Compression;
  const interlaced = searchParams.get("interlaced") === "true" ? true : false;

  const urlGen = dir ? directoryToUrlMap[dir] : null;
  const url = urlGen
    ? urlGen(
        img,
        w,
        q,
        c,
        interlaced,
        httpVer ? HTTP_VER_TO_CDN_URL[httpVer] : BUCKET_URL
      )
    : "";

  const warnings = [
    {
      show: dir === "png" && c === "lossy",
      info: "You are trying to load PNG file with lossy compression - PNG are always lossless - Lossless PNG was loaded",
    },
    {
      show: dir === "jpg" && c === "lossless",
      info: "You are trying to load JPG file with lossless compression - JPG are always lossy - Lossy JPG was loaded",
    },
  ];

  return (
    <>
      <img src={url} alt="IMAGE NOT FOUND FOR URL:" />
      <ReferenceImageControls />
      <div>
        Settings: [dir]:{dir} [img]:{img} [width]:{w} [quality/lvl]:{q}
        interlaced: {`${interlaced}`}
      </div>
    </>
  );
};
