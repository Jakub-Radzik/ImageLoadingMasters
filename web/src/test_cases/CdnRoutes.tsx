import { Route, Routes } from "react-router-dom";
import { CdnTest } from "./Techniques/CDN/CdnTest";

export const CdnRoutes = () => {
  return (
    <Routes>
      <Route path="/ref" element={<CdnTest httpVer={0} />} />
      <Route path="/cdn1" element={<CdnTest httpVer={1} />} />
      <Route path="/cdn2" element={<CdnTest httpVer={2} />} />
      <Route path="/cdn3" element={<CdnTest httpVer={3} />} />
    </Routes>
  );
};
