import { CabContext, CabContextData, TokenMeta } from '@/contexts/CabContext';
import useCab, { Token } from '@/hooks/useCab';
import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Spinner from 'react-spinners/ClockLoader';
import { FiFrown, FiGithub, FiSmile } from 'react-icons/fi';

const serviceId = 'digital-ads';
export default function DigitalAds() {
  const [tokenMeta, setTokenMeta] = useState<TokenMeta>({
    requestedAt: Date.now(),
    refreshedAt: 0,
  });
  const [token, setToken] = useState<Token>();
  const handleToken = useCallback((token: Token) => {
    setTokenMeta((prev) => ({
      ...prev,
      refreshedAt: Date.now(),
    }));
    setToken(token);
  }, []);
  const { bridge, loading, error } = useCab(
    {
      serviceId,
      autoResize: false,
      debug: false,
    },
    handleToken
  );
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
          'flex flex-row gap-2 items-center p-2',
          'text-sm text-gray-600',
          'bg-gray-200 bg-opacity-40',
          'border-b border-gray-300'
        )}
      >
        <nav
          className={classNames(
            'flex flex-row items-center gap-4',
            'font-semibold'
          )}
        >
          <Link to="./">Home</Link>
          <Link to="./navigation">Navigation</Link>
          <Link to="./widget">Widget</Link>
        </nav>
        <div className="flex-1" />
        <div
          className={classNames(bridge ? 'text-emerald-600' : 'text-rose-600')}
        >
          {bridge ? <FiSmile size={24} /> : <FiFrown size={24} />}
        </div>
        <a href="https://github.com/wizcas/cab-demo" target="_blank">
          <FiGithub size={24} />
        </a>
      </header>
      {error && <div>{error}</div>}
      <Outlet />
    </CabContext.Provider>
  );
}
