import { useRef, useEffect, useCallback } from 'react';
import { useAsync } from 'react-use';

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

  const { value, loading, error } = useAsync<() => Promise<EmbeddedApp>>(
    initCAB,
    []
  );
  const bridgeRef = useRef<EmbeddedApp | undefined>(value);
  bridgeRef.current = value;

  async function initCAB(): Promise<EmbeddedApp> {
    if (bridgeRef.current) return bridgeRef.current;
    try {
      console.group(
        'embedded app initialization',
        new Date().toLocaleTimeString()
      );
      const bridge = EmbeddedApp.create(config);
      await bridge.isReady();
      console.log('embedded bridge is ready', bridge);
      bridge.subscribe('AUTHENTICATE', handleToken);
      const token = await bridge.dispatch({ type: 'AUTHENTICATE' });
      console.log({ token });
      handleToken(token);
      console.groupEnd();
      return bridge;
    } catch (e) {
      console.groupEnd();
      console.error('failed to initialize the embedded app', e);
      throw e;
    }
  }

  const handleToken = useCallback(
    (token: Token) => {
      console.log('embedded app has received a token', token);
      onReceiveToken?.(token);
    },
    [onReceiveToken]
  );

  useEffect(() => {
    () => {
      bridgeRef.current?.destroy();
    };
  }, []);
  return {
    bridge: bridgeRef.current,
    loading,
    error,
  };
}
