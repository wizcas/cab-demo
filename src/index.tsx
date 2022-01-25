import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import DaBridgeInfo from './components/CabTokenDisplay';
import './index.css';
import DigitalAds from './pages/DigitalAds';
import DaTransactionWidget from './pages/DigitalAds/DaTransactionWidget';
import Home from './pages/Home';

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="da" element={<DigitalAds />}>
            <Route index element={<DaBridgeInfo />} />
            <Route path="widget" element={<DaTransactionWidget />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
