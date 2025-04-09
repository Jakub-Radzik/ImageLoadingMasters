import { Route, Routes, useSearchParams } from "react-router-dom";
import { ResponsiveClownCar } from "./Techniques/Responsive_ClownCar";
import { directoryToUrlMap } from "../utils/url";
import { ResponsiveHTML } from "./Techniques/Responsive_HTML";

export const TechniquesRoutes = () => {
  const [searchParams] = useSearchParams();
  const img = parseInt(searchParams.get("img") || "0");

  const bigJpeg = directoryToUrlMap["jpg"](img, 1920, 90, "lossy", false);
  const smallJpeg = directoryToUrlMap["jpg"](img, 400, 90, "lossy", false);

  const big1 = directoryToUrlMap["jpg"](1, 1920, 90, "lossy", false);
  const small1 = directoryToUrlMap["jpg"](1, 400, 90, "lossy", false);

  const big2 = directoryToUrlMap["jpg"](2, 1920, 90, "lossy", false);
  const small2 = directoryToUrlMap["jpg"](2, 400, 90, "lossy", false);

  const big3 = directoryToUrlMap["jpg"](3, 1920, 90, "lossy", false);
  const small3 = directoryToUrlMap["jpg"](3, 400, 90, "lossy", false);

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
          path="/ccts"
          element={
            <>
              <ResponsiveClownCar
                smallSrc={small1}
                largeSrc={big1}
                altText={"Nothing"}
              />
              <ResponsiveClownCar
                smallSrc={small2}
                largeSrc={big2}
                altText={"Nothing"}
              />
              <ResponsiveClownCar
                smallSrc={small3}
                largeSrc={big3}
                altText={"Nothing"}
              />
            </>
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
        <Route
          path="/html5s"
          element={
            <>
              <ResponsiveHTML
                smallSrc={small1}
                largeSrc={big1}
                altText={"Nothing"}
              />
              <ResponsiveHTML
                smallSrc={small2}
                largeSrc={big2}
                altText={"Nothing"}
              />
              <ResponsiveHTML
                smallSrc={small3}
                largeSrc={big3}
                altText={"Nothing"}
              />
            </>
          }
        />
      </Routes>
    </>
  );
};
