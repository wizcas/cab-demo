import dayjs from 'dayjs';
import CabTokenDisplay from '@/components/CabTokenDisplay';
import { useContext } from 'react';
import { CabContext } from '@/contexts/CabContext';

export default function DaHome() {
  const { bridge } = useContext(CabContext);

  return (
    <div>
      <CabTokenDisplay />
      <div>
        <button>Get flags</button>
      </div>
    </div>
  );
}
