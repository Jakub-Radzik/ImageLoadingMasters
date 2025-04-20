import { directoryToUrlMap, HTTP_VER_TO_CDN_URL } from "../../../utils/url";

export const CdnTest = ({ httpVer }: { httpVer: 0 | 1 | 2 | 3 }) => {
  const jpegGen = directoryToUrlMap["jpg"];
  const avifGen = directoryToUrlMap["avif"];

  const w = 1920;
  const q = 90;
  const i = false;
  const c = "lossy";
  const s = HTTP_VER_TO_CDN_URL[httpVer];

  const url1 = jpegGen(1, w, q, c, i, s);
  const url2 = jpegGen(2, w, q, c, i, s);
  const url3 = jpegGen(3, w, q, c, i, s);
  const url4 = avifGen(2, w, q, c, i, s);
  const url5 = avifGen(3, w, q, c, i, s);

  return (
    <>
      <div className="flex flex-row w-full justify-center">
        <img
          className="w-1/8 object-cover"
          src={url1}
          alt="IMAGE NOT FOUND FOR URL:"
        />
        <img
          className="w-1/8 object-cover"
          src={url3}
          alt="IMAGE NOT FOUND FOR URL:"
        />
        <img
          className="w-1/8 object-cover"
          src={url4}
          alt="IMAGE NOT FOUND FOR URL:"
        />
        <img
          className="w-1/8 object-cover"
          src={url5}
          alt="IMAGE NOT FOUND FOR URL:"
        />
      </div>
      <div className="flex flex-row w-full justify-center">
        <img
          className="w-1/2 object-cover"
          src={url2}
          alt="IMAGE NOT FOUND FOR URL:"
        />
      </div>
    </>
  );
};
