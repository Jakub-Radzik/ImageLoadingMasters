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

function App() {
  return (
    <>
      <TestPageLayout>
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
        </Routes>
      </TestPageLayout>
    </>
  );
}

export default App;
