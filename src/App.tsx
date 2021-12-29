import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import DigitalAds from '@/pages/DigitalAds';
import DaBridgeInfo from '@/pages/DigitalAds/DaBridgeInfo';

export default function App() {
  return (
    <main className="demo-root">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DigitalAds />}>
            <Route index element={<DaBridgeInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}
