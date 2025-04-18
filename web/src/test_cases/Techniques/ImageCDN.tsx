import { useSearchParams } from "react-router-dom";
import {
  Compression,
  FORMAT,
  HTTP_VER_TO_CDN_URL,
  directoryToUrlMap,
} from "../../utils/url";
import { ReferenceImageControls } from "../Controls/ReferenceImageControls";
import { Helmet } from "react-helmet";

export const ImageCDN = ({
  httpVer,
  img_param,
}: {
  httpVer: 2 | 3;
  img_param?: number;
}) => {
  const [searchParams] = useSearchParams();
  const dir = searchParams.get("dir") as FORMAT | null;
  const img = img_param ? img_param : parseInt(searchParams.get("img") || "0");
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
      {httpVer === 3 ? (
        <Helmet>
          <link
            rel="preconnect"
            href={HTTP_VER_TO_CDN_URL[httpVer]}
            crossOrigin="anonymous"
          />
          {/* <meta http-equiv="x-dns-prefetch-control" content="on"></meta> */}
        </Helmet>
      ) : null}
      <img src={url} alt="IMAGE NOT FOUND FOR URL:" />
      <ReferenceImageControls />
      <div>
        Settings: [dir]:{dir} [img]:{img} [width]:{w} [quality/lvl]:{q}
        interlaced: {`${interlaced}`}
      </div>
      <div>URL: {url}</div>
    </>
  );
};
