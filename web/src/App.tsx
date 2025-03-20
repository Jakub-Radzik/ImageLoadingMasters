import TestPageLayout from "./components/TestPageLayout";
import { ReferenceImage } from "./test_cases/ReferenceImage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <TestPageLayout>
      <Routes>
        <Route path="/ref" element={<ReferenceImage />} />
      </Routes>
    </TestPageLayout>
  );
}

export default App;
