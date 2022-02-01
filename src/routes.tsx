import { Routes, Route } from 'react-router-dom';
import App from './App';
import DigitalAds from './pages/DigitalAds';
import DaHome from './pages/DigitalAds/DaHome';
import DaNavigation from './pages/DigitalAds/DaNavigation';
import DaTransactionWidget from './pages/DigitalAds/DaTransactionWidget';
import Home from './pages/Home';

const routes = (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="da" element={<DigitalAds />}>
        <Route index element={<DaHome />} />
        <Route path="navigation" element={<DaNavigation />} />
        <Route path="widget" element={<DaTransactionWidget />} />
      </Route>
    </Route>
  </Routes>
);
export default routes;
