import { BrowserRouter, Route, Routes } from "react-router-dom";
import DigitalAds from "@/pages/DigitalAds";
import DABridgeInfo from "@/pages/DigitalAds/DABridgeInfo";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DigitalAds />}>
          <Route path="info" element={<DABridgeInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
