import { CabContext } from '@/contexts/CabContext';
import { useContext } from 'react';

export default function DaBridgeInfo() {
  const ctx = useContext(CabContext);
  return (
    <div>
      <span>token</span>
      <span>{ctx.token?.value || 'N/A'}</span>
    </div>
  );
}
