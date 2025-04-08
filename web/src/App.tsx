import { Route, Routes } from "react-router-dom";
import { TestPageLayout } from "./components/TestPageLayout";
import { ReferenceImage } from "./test_cases/References/ReferenceImage";
import { ReferenceImages } from "./test_cases/References/ReferenceImages";
import { Survey } from "./survey/Survey";
import {
  fullImageComparisons,
  fullSettings,
  losslessImageComparisons,
  pngSettings,
} from "./survey/utils/settings";
import { ResponsiveClownCar } from "./test_cases/Techniques/Responsive_ClownCar";
import { directoryToUrlMap } from "./utils/url";
import { TechniquesRoutes } from "./test_cases/TechniqueRoutes";

function App() {
  const path = window.location.pathname;
  const show = path !== "/" && path !== "/extension";

  return (
    <>
      <TestPageLayout show={show}>
        <Routes>
          <Route path="/ref" element={<ReferenceImage />} />
          <Route path="/refs" element={<ReferenceImages />} />
          <Route
            path="/"
            element={
              <Survey
                comparisons={fullImageComparisons}
                settings={fullSettings}
              />
            }
          />
          <Route
            path="/extension"
            element={
              <Survey
                comparisons={losslessImageComparisons}
                settings={pngSettings}
              />
            }
          />
          <Route path="/techniques/*" element={<TechniquesRoutes />} />
        </Routes>
      </TestPageLayout>
    </>
  );
}

export default App;
