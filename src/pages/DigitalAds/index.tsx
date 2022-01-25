import { CabContext, CabContextData, TokenMeta } from '@/contexts/CabContext';
import useCab, { Token } from '@/hooks/useCab';
import { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Spinner from 'react-spinners/PacmanLoader';

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
    <div>
      <Spinner />
    </div>
  ) : (
    <CabContext.Provider value={ctx}>
      {error && <div>{error}</div>}
      <Outlet />
    </CabContext.Provider>
  );
}
