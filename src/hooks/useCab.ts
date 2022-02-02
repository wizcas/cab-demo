import { useEffect, useCallback, useState } from 'react';

import { EmbeddedApp } from 'vendor/compass-app-bridge';
import type { EmbeddedAppConfig } from 'vendor/compass-app-bridge/EmbeddedApp/EmbeddedApp';
import useParentOrigin from './useParentOrigin';

export interface Token {
  value: string;
  expireAt: number;
}

type TokenHandlerFn = (token: Token) => void;

export default function useCab(
  config: EmbeddedAppConfig,
  onReceiveToken: TokenHandlerFn
) {
  config.origin = useParentOrigin();
  const [bridge, setBridge] = useState<EmbeddedApp | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const handleToken = useCallback(
    (token: Token) => {
      console.group('CAB token feed', new Date().toLocaleTimeString());
      console.log('received token', token);
      onReceiveToken?.(token);
      console.groupEnd();
    },
    [onReceiveToken]
  );

  useEffect(() => {
    function end() {
      setLoading(false);
    }
    async function waitForBridge(newBridge: EmbeddedApp) {
      try {
        await newBridge.isReady();
        console.log('embedded bridge is ready', newBridge);
        setBridge(newBridge);
        handleToken(await newBridge.dispatch({ type: 'AUTHENTICATE' }));
        newBridge.subscribe('AUTHENTICATE', handleToken);
      } catch (e) {
        console.log('failed to ready the app bridge', e);
        setError('CAB cannot be ready');
      } finally {
        end();
      }
    }
    function initCAB(): EmbeddedApp | null {
      setLoading(true);
      try {
        const newBridge = EmbeddedApp.create(config);
        waitForBridge(newBridge);
        return newBridge;
      } catch (e) {
        console.error('failed to create the embedded app', e);
        setError('CAB create error');
        return null;
      } finally {
        end();
      }
    }
    console.group(
      'initializing the embedded bridge...',
      new Date().toLocaleTimeString()
    );
    const b = initCAB();
    console.groupEnd();
    return () => {
      b?.destroy();
    };
  }, [
    handleToken,
    config.origin,
    config.serviceId,
    config.debug,
    config.autoResize,
  ]);

  return {
    bridge,
    loading,
    error,
  };
}
