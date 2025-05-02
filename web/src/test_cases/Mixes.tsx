import { Route, Routes, useSearchParams } from "react-router-dom";
import { directoryToUrlMap } from "../utils/url";
import { ResponsiveHTML } from "./Techniques/Responsive_HTML";
import { AdaptiveNetwork } from "./Techniques/Adaptive_Network";
import { AdaptiveResponsiveImage } from "./MixTechniques/AdaptiveResponsiveImage";

export const Mixes = () => {
  const [searchParams] = useSearchParams();
  const img = parseInt(searchParams.get("img") || "0");

  const bigJpegHighQ = directoryToUrlMap["jpg"](img, 1920, 90, "lossy", false);
  const bigJpegLowQ = directoryToUrlMap["jpg"](img, 1920, 40, "lossy", false);

  const smallJpegHighQ = directoryToUrlMap["jpg"](img, 400, 90, "lossy", false);
  const smallJpegLowQ = directoryToUrlMap["jpg"](img, 400, 40, "lossy", false);

  return (
    <>
      <Routes>
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
