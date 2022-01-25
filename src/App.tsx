import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import DigitalAds from '@/pages/DigitalAds';
import DaBridgeInfo from '@/pages/DigitalAds/DaBridgeInfo';
import Home from './pages/Home';

export default function App() {
  return (
    <main className="demo-root">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/digital-ads" element={<DigitalAds />}>
            <Route index element={<DaBridgeInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}
