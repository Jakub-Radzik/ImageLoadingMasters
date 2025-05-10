import { Route, Routes, useSearchParams } from "react-router-dom";
import { directoryToUrlMap } from "../utils/url";
import { ResponsiveHTML } from "./Techniques/Responsive_HTML";
import { AdaptiveNetwork } from "./Techniques/Adaptive_Network";
import { AdaptiveResponsiveImage } from "./MixTechniques/AdaptiveResponsiveImage";

export const Mixes = () => {
  const [searchParams] = useSearchParams();
  const img = parseInt(searchParams.get("img") || "0");

  // JPEG LOSSY
  const bigJpegHighQ = directoryToUrlMap["jpg"](img, 1920, 90, "lossy", false);
  const bigJpegLowQ = directoryToUrlMap["jpg"](img, 1920, 40, "lossy", false);

  const smallJpegHighQ = directoryToUrlMap["jpg"](img, 400, 90, "lossy", false);
  const smallJpegLowQ = directoryToUrlMap["jpg"](img, 400, 40, "lossy", false);
  // AVIS LOSSLESS
  const bigAVIF = directoryToUrlMap["avif"](img, 1920, 1, "lossless", false);
  const smallAVIF = directoryToUrlMap["avif"](img, 400, 1, "lossless", false);

  // WEBP LOSSY
  const bigWEBPHighQ = directoryToUrlMap["webp"](img, 1920, 90, "lossy", false);
  const bigWEBPLowQ = directoryToUrlMap["webp"](img, 1920, 40, "lossy", false);

  const smallWEBPHighQ = directoryToUrlMap["webp"](
    img,
    400,
    90,
    "lossy",
    false
  );
  const smallWEBPLowQ = directoryToUrlMap["webp"](img, 400, 40, "lossy", false);

  return (
    <>
      <Route
        path="/adaptive/avif"
        element={
          <AdaptiveResponsiveImage
            smallSlow={smallAVIF}
            smallFast={smallAVIF}
            largeSlow={bigAVIF}
            largeFast={bigAVIF}
            altText={"Hisrc + HTML 5.1"}
          />
        }
      />

      <Routes>
        <Route
          path="/adaptive/webp"
          element={
            <AdaptiveResponsiveImage
              smallSlow={smallWEBPLowQ}
              smallFast={smallWEBPHighQ}
              largeSlow={bigWEBPLowQ}
              largeFast={bigWEBPHighQ}
              altText={"Hisrc + HTML 5.1"}
            />
          }
        />

        {/* HISRC + HTML 5.1 */}
        <Route
          path="/adaptive"
          element={
            <AdaptiveResponsiveImage
              smallSlow={smallJpegLowQ}
              smallFast={smallJpegHighQ}
              largeSlow={bigJpegLowQ}
              largeFast={bigJpegHighQ}
              altText={"Hisrc + HTML 5.1"}
            />
          }
        />

        <Route
          path="/hisrc"
          element={
            <AdaptiveNetwork
              slowSrc={smallJpegHighQ}
              mediumSrc={smallJpegHighQ}
              fastSrc={bigJpegHighQ}
              altText={"Nothing"}
            />
          }
        />

        <Route
          path="/html5"
          element={
            <ResponsiveHTML
              smallSrc={smallJpegHighQ}
              largeSrc={bigJpegHighQ}
              altText={"Nothing"}
            />
          }
        />
      </Routes>
    </>
  );
};
