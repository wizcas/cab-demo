import dayjs from 'dayjs';
import CabTokenDisplay from '@/components/CabTokenDisplay';
import { useContext, useState } from 'react';
import { CabContext } from '@/contexts/CabContext';
import InfoTable, { NaCell } from '@/components/InfoTable';

export default function DaHome() {
  const { bridge, refresh } = useContext(CabContext);

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
      <div className="flex flex-row gap-2">
        <button onClick={refresh}>Manual refresh token</button>
        <button onClick={handleGetFlags}>Query Glide flags</button>
      </div>
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
  );
}
