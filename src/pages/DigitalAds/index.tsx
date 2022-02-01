import { CabContext, CabContextData, TokenMeta } from '@/contexts/CabContext';
import useCab, { Token } from '@/hooks/useCab';
import { useMemo, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Spinner from 'react-spinners/ClockLoader';

const origins = {
  beta: 'https://app.dev.glide.com',
  dev: 'http://webapp.localhost',
};
const serviceId = 'digital-ads';
export default function DigitalAds() {
  const [tokenMeta, setTokenMeta] = useState<TokenMeta>({
    requestedAt: Date.now(),
    refreshedAt: 0,
  });
  const [token, setToken] = useState<Token>();
  const { bridge, loading, error } = useCab(
    {
      origin: origins.dev,
      serviceId,
      autoResize: false,
      debug: true,
    },
    (token) => {
      setTokenMeta((prev) => ({
        ...prev,
        refreshedAt: Date.now(),
      }));
      setToken(token);
    }
  );
  if (error) {
    console.error('Loading CAB error:', error.message);
  }
  const ctx = useMemo<CabContextData>(
    () => ({
      bridge,
      token,
      tokenMeta,
    }),
    [bridge, token, tokenMeta]
  );
  return loading ? (
    <div className="flex flex-col items-center gap-2 p-4">
      <div className="w-[64px] h-[64px]">
        <Spinner />
      </div>
      <div className="text-sm text-gray-600">
        Initializing the app bridge...
      </div>
    </div>
  ) : (
    <CabContext.Provider value={ctx}>
      <nav>
        <Link to="./">Home</Link>
        <Link to="./navigation">Navigation</Link>
        <Link to="./widget">Widget</Link>
      </nav>
      {error && <div>{error}</div>}
      <Outlet />
    </CabContext.Provider>
  );
}
