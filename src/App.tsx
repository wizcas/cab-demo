import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import DigitalAds from '@/pages/DigitalAds';
import DaBridgeInfo from '@/pages/DigitalAds/DaBridgeInfo';
import Home from './pages/Home';
import DaTransactionWidget from './pages/DigitalAds/DaTransactionWidget';

export default function App() {
  return (
    <main className="demo-root">
      <Outlet />
    </main>
  );
}
