import { useSearchParams } from "react-router-dom";
import { Compression, directoryToUrlMap, FORMAT } from "../../utils/url";
import { ReferenceImageControls } from "../Controls/ReferenceImageControls";

export const PreloadImages = ({ httpVer }: { httpVer?: 2 | 3 }) => {
  const [searchParams] = useSearchParams();
  const dir = searchParams.get("dir") as FORMAT | null;
  const w = parseInt(searchParams.get("w") || "0");
  const q = parseInt(searchParams.get("q") || "-1");
  const c = (searchParams.get("c") || "lossless") as Compression;
  const interlaced = searchParams.get("interlaced") === "true" ? true : false;

  const urlGen = dir ? directoryToUrlMap[dir] : null;

  const url1 = urlGen
    ? urlGen(1, w, q, c, interlaced, "https://d3hzr9dj22rq3r.cloudfront.net")
    : "";
  const url2 = urlGen
    ? urlGen(2, w, q, c, interlaced, "https://d3mod0x7tnnn30.cloudfront.net")
    : "";
  const url3 = urlGen
    ? urlGen(3, w, q, c, interlaced, "https://dfxg7h3636r8h.cloudfront.net")
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

      <ReferenceImageControls />
    </>
  );
};
