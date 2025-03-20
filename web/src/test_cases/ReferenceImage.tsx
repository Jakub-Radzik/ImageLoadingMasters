import { useSearchParams } from "react-router-dom";
import { DIRECTORY, directoryToUrlMap } from "../utils/url";

export const ReferenceImage = () => {
  const [searchParams] = useSearchParams();
  const dir = searchParams.get("dir") as DIRECTORY | null;
  const img = parseInt(searchParams.get("img") || "0");
  const w = parseInt(searchParams.get("w") || "0");
  const q = parseInt(searchParams.get("q") || "-1");
  const interlaced = searchParams.get("interlaced") === "true" ? true : false;

  const urlGen = dir ? directoryToUrlMap[dir] : null;
  const url = urlGen ? urlGen(img, w, q, interlaced) : "";

  return (
    <>
      <div>
        Settings: [dir]:{dir} [img]:{img} [width]:{w} [quality/lvl]:{q}{" "}
        interlaced: {`${interlaced}`}
      </div>
      <div>URL: {url}</div>
      <img src={url} alt="IMAGE NOT FOUND FOR URL:" />
    </>
  );
};
