import { useSearchParams } from "react-router-dom";
import {
  Compression,
  FORMAT,
  HTTP_VER_TO_CDN_URL,
  directoryToUrlMap,
} from "../../utils/url";

export const ImageCDNs = ({ httpVer }: { httpVer: 2 | 3 }) => {
  const [searchParams] = useSearchParams();
  const dir = searchParams.get("dir") as FORMAT | null;
  const w = parseInt(searchParams.get("w") || "0");
  const q = parseInt(searchParams.get("q") || "-1");
  const c = (searchParams.get("c") || "lossless") as Compression;
  const interlaced = searchParams.get("interlaced") === "true" ? true : false;

  const urlGen = dir ? directoryToUrlMap[dir] : null;
  const url1 = urlGen
    ? urlGen(1, w, q, c, interlaced, HTTP_VER_TO_CDN_URL[httpVer])
    : "";
  const url2 = urlGen
    ? urlGen(2, w, q, c, interlaced, HTTP_VER_TO_CDN_URL[httpVer])
    : "";
  const url3 = urlGen
    ? urlGen(3, w, q, c, interlaced, HTTP_VER_TO_CDN_URL[httpVer])
    : "";

  return (
    <>
      <div className="flex flex-row w-full">
        <img
          className="w-1/3 object-cover"
          src={url1}
          alt="IMAGE NOT FOUND FOR URL:"
        />
        <img
          className="w-1/3 object-cover"
          src={url2}
          alt="IMAGE NOT FOUND FOR URL:"
        />
        <img
          className="w-1/3 object-cover"
          src={url3}
          alt="IMAGE NOT FOUND FOR URL:"
        />
      </div>
      <h1>http: {httpVer}</h1>
      <div>{url1}</div>
      <div>{url2}</div>
      <div>{url3}</div>
    </>
  );
};
