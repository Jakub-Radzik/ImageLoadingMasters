import { Route, Routes } from "react-router-dom";
import { TestPageLayout } from "./components/TestPageLayout";
import { ReferenceImage } from "./test_cases/ReferenceImage";

function App() {
  return (
    <TestPageLayout>
      <Routes>
        <Route path="/" element={<ReferenceImage />} />
        <Route path="/ref" element={<ReferenceImage />} />
      </Routes>
    </TestPageLayout>
  );
}

export default App;
