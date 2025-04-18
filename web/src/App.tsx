import { Route, Routes } from "react-router-dom";
import { TestPageLayout } from "./components/TestPageLayout";
import { ReferenceImage } from "./test_cases/References/ReferenceImage";
import { ReferenceImages } from "./test_cases/References/ReferenceImages";

import { TechniquesRoutes } from "./test_cases/TechniqueRoutes";
import { PreloadImages } from "./test_cases/References/PreloadImages";

function App() {
  const path = window.location.pathname;
  const show = path !== "/" && path !== "/extension";

  return (
    <>
      <TestPageLayout show={show}>
        <Routes>
          <Route path="/ref" element={<ReferenceImage />} />
          <Route path="/refs" element={<ReferenceImages />} />
          <Route path="/pres" element={<PreloadImages />} />

          <Route path="/cdn2" element={<ReferenceImage httpVer={2} />} />
          <Route path="/cdn3" element={<ReferenceImage httpVer={3} />} />

          <Route path="/cdns2" element={<ReferenceImages httpVer={2} />} />
          <Route path="/cdns3" element={<ReferenceImages httpVer={3} />} />

          <Route path="/" element={<div>Dziękuje za udział w ankiecie</div>} />
          <Route path="/techniques/*" element={<TechniquesRoutes />} />
        </Routes>
      </TestPageLayout>
    </>
  );
}

export default App;
