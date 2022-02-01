import dayjs from 'dayjs';
import CabTokenDisplay from '@/components/CabTokenDisplay';
import { useContext, useState } from 'react';
import { CabContext } from '@/contexts/CabContext';
import InfoTable, { NaCell } from '@/components/InfoTable';

export default function DaHome() {
  const { bridge } = useContext(CabContext);
  const [flags, setFlags] = useState({});

  const hasFlags = Object.keys(flags).length > 0;

  async function handleGetFlags() {
    const flags = await bridge?.dispatch({
      type: 'GET_RESOURCE',
      payload: {
        flags: [
          'glide-da.stripe-alt-key',
          'glide-da',
          'transactions.search-api-migration',
        ],
      },
    });
    setFlags(flags);
    console.log({ flags });
  }

  return (
    <div className="p-2">
      <CabTokenDisplay className="mb-4" />
      <div>
        <button onClick={handleGetFlags}>Get flags</button>
        {hasFlags && (
          <InfoTable
            className="mt-2"
            rows={Object.entries(flags).map(([key, value]) => ({
              label: key,
              value: `${value}` ?? <NaCell />,
            }))}
          />
        )}
      </div>
    </div>
  );
}
