import { Route, Routes } from "react-router-dom";
import { TestPageLayout } from "./components/TestPageLayout";
import { ReferenceImage } from "./test_cases/References/ReferenceImage";
import { ReferenceImages } from "./test_cases/References/ReferenceImages";
import { Survey } from "./survey/Survey";

function App() {
  return (
    <>
      <TestPageLayout>
        <Routes>
          <Route path="/ref" element={<ReferenceImage />} />
          <Route path="/refs" element={<ReferenceImages />} />
          <Route path="/" element={<Survey />} />
        </Routes>
      </TestPageLayout>
    </>
  );
}

export default App;
