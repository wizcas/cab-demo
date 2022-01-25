import { CabContext } from '@/contexts/CabContext';
import { useContext } from 'react';
import dayjs from 'dayjs';
import InfoTable from './InfoTable';

function formatDateTime(v: number | string | undefined) {
  if (!v) return 'N/A';
  return dayjs(v).format('YYYY-MM-DD HH:mm:ss');
}

export default function DaBridgeInfo() {
  const ctx = useContext(CabContext);
  return (
    <InfoTable
      rows={[
        {
          label: 'Token',
          value: (
            <>
              <span>{ctx.token?.value}</span>
              <button>copy</button>
            </>
          ),
        },
        {
          label: 'Expiring at',
          value: formatDateTime(ctx.token?.expireAt),
        },
        {
          label: 'Requested at',
          value: formatDateTime(ctx.tokenMeta?.requestedAt),
        },
        {
          label: 'Refreshed at',
          value: formatDateTime(ctx.tokenMeta?.refreshedAt),
        },
      ]}
    />
  );
}
