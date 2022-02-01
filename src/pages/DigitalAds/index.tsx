import { CabContext, CabContextData, TokenMeta } from '@/contexts/CabContext';
import useCab, { Token } from '@/hooks/useCab';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Spinner from 'react-spinners/ClockLoader';

const serviceId = 'digital-ads';
export default function DigitalAds() {
  const [tokenMeta, setTokenMeta] = useState<TokenMeta>({
    requestedAt: Date.now(),
    refreshedAt: 0,
  });
  const [token, setToken] = useState<Token>();
  const { bridge, loading, error } = useCab(
    {
      origin: document.referrer,
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
      refresh() {
        bridge?.dispatch({
          type: 'AUTHENTICATE',
        });
        setTokenMeta((prev) => ({
          ...prev,
          requestedAt: Date.now(),
        }));
      },
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
      <header
        className={classNames(
          'flex flex-row justify-between items-center p-2',
          'text-sm text-gray-600',
          'bg-gray-200 bg-opacity-40',
          'border-b border-gray-300'
        )}
      >
        <nav
          className={classNames(
            'flex flex-row items-center gap-2',
            'font-semibold'
          )}
        >
          <Link to="./">Home</Link>
          <Link to="./navigation">Navigation</Link>
          <Link to="./widget">Widget</Link>
        </nav>
        <div
          className={classNames(
            'text-xs',
            bridge ? 'text-emerald-600' : 'text-rose-600'
          )}
        >
          {bridge ? 'CAB ready' : 'CAB error'}
        </div>
      </header>
      {error && <div>{error}</div>}
      <Outlet />
    </CabContext.Provider>
  );
}
