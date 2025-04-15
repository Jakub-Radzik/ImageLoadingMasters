import { useSearchParams } from "react-router-dom";
import {
  Compression,
  FORMAT,
  HTTP_VER_TO_CDN_URL,
  directoryToUrlMap,
} from "../../utils/url";
import { ReferenceImageControls } from "../Controls/ReferenceImageControls";

export const ImageCDN = ({ httpVer }: { httpVer: 2 | 3 }) => {
  const [searchParams] = useSearchParams();
  const dir = searchParams.get("dir") as FORMAT | null;
  const img = parseInt(searchParams.get("img") || "0");
  const w = parseInt(searchParams.get("w") || "0");
  const q = parseInt(searchParams.get("q") || "-1");
  const c = (searchParams.get("c") || "lossless") as Compression;
  const interlaced = searchParams.get("interlaced") === "true" ? true : false;

  const urlGen = dir ? directoryToUrlMap[dir] : null;
  const url = urlGen
    ? urlGen(img, w, q, c, interlaced, HTTP_VER_TO_CDN_URL[httpVer])
    : "";

  return (
    <>
      <div>
        Settings: [dir]:{dir} [img]:{img} [width]:{w} [quality/lvl]:{q}
        interlaced: {`${interlaced}`}
      </div>
      <div>URL: {url}</div>
      <img src={url} alt="IMAGE NOT FOUND FOR URL:" />
      <ReferenceImageControls />
    </>
  );
};
