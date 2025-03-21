import { Route, Routes } from "react-router-dom";
import { TestPageLayout } from "./components/TestPageLayout";
import { ReferenceImage } from "./test_cases/ReferenceImage";
import { ReferenceImages } from "./test_cases/ReferenceImages";

function App() {
  return (
    <TestPageLayout>
      <Routes>
        <Route path="/" element={<ReferenceImage />} />
        <Route path="/ref" element={<ReferenceImage />} />
        <Route path="/refs" element={<ReferenceImages />} />
      </Routes>
    </TestPageLayout>
  );
}

export default App;
