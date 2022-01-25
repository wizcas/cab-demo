import { Token } from '@/hooks/useCab';
import { createContext } from 'react';
import { EmbeddedApp } from 'vendor/compass-app-bridge';

export interface TokenMeta {
  requestedAt: number;
  refreshedAt?: number;
}
export interface CabContextData {
  bridge?: EmbeddedApp;
  token?: Token;
  tokenMeta: TokenMeta;
}
export const CabContext = createContext<CabContextData>({
  tokenMeta: { requestedAt: 0, refreshedAt: 0 },
});
