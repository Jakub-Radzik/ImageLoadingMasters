import { Route, Routes, useSearchParams } from "react-router-dom";
import { ResponsiveClownCar } from "./Techniques/Responsive_ClownCar";
import { Compression, FORMAT, directoryToUrlMap } from "../utils/url";
import { ResponsiveHTML } from "./Techniques/Responsive_HTML";
import { ResponsivePicturefill } from "./Techniques/Responsive_Picturefill";

export const TechniquesRoutes = () => {
  const [searchParams] = useSearchParams();
  const img = parseInt(searchParams.get("img") || "0");

  const bigJpeg = directoryToUrlMap["jpg"](img, 1920, 90, "lossy", false);
  const smallJpeg = directoryToUrlMap["jpg"](img, 400, 90, "lossy", false);

  return (
    <>
      <Routes>
        <Route
          path="/cct"
          element={
            <ResponsiveClownCar
              smallSrc={smallJpeg}
              largeSrc={bigJpeg}
              altText={"Nothing"}
            />
          }
        />
        <Route
          path="/html5"
          element={
            <ResponsiveHTML
              smallSrc={smallJpeg}
              largeSrc={bigJpeg}
              altText={"Nothing"}
            />
          }
        />
      </Routes>
    </>
  );
};
