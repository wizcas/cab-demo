import { CabContext, CabContextData, TokenMeta } from '@/contexts/CabContext';
import useCab, { Token } from '@/hooks/useCab';
import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Spinner from 'react-spinners/ClockLoader';
import { FiFrown, FiGithub, FiSmile } from 'react-icons/fi';
import { BiBugAlt } from 'react-icons/bi';
import ReactTooltip from 'react-tooltip';
import ReactSwitch from 'react-switch';
import { useLocalStorage } from 'react-use';
import historyNotifier from '@/historyNotifier';

const serviceId = 'digital-ads';
export default function DigitalAds() {
  const [tokenMeta, setTokenMeta] = useState<TokenMeta>({
    requestedAt: Date.now(),
    refreshedAt: 0,
  });
  const [token, setToken] = useState<Token>();
  const [debug = false, setDebug] = useLocalStorage('cab-demo-debug', false);

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
      debug,
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
        <div data-tip data-for="cab-debug" className="h-[24px]">
          <ReactSwitch
            checked={debug}
            onChange={setDebug}
            height={24}
            checkedHandleIcon={<SwitchHandle />}
            uncheckedHandleIcon={<SwitchHandle />}
          />
        </div>
        <div
          className={classNames(bridge ? 'text-emerald-600' : 'text-rose-600')}
        >
          <div data-tip data-for="cab-status">
            {bridge ? <FiSmile size={24} /> : <FiFrown size={24} />}
          </div>
        </div>
        <a href="https://github.com/wizcas/cab-demo" target="_blank">
          <FiGithub size={24} />
        </a>
      </header>
      {error && <div>{error}</div>}
      <Outlet />
      <ReactTooltip id="cab-debug" place="left">
        Print CAB debug logs in the console.
      </ReactTooltip>
      <ReactTooltip
        id="cab-status"
        place="left"
        type={bridge ? 'success' : 'error'}
      >
        {bridge ? (
          <span>CAB is ready</span>
        ) : (
          <span>
            CAB is not ready. <br />
            Please check the console for details.
          </span>
        )}
      </ReactTooltip>
    </CabContext.Provider>
  );
}

function SwitchHandle() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <BiBugAlt size={18} />
    </div>
  );
}
