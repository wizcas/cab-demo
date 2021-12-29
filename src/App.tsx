import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DigitalAds from '@/pages/DigitalAds';
import DaBridgeInfo from '@/pages/DigitalAds/DaBridgeInfo';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DigitalAds />}>
          <Route index element={<DaBridgeInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
