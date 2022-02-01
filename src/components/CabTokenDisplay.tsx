import { CabContext } from '@/contexts/CabContext';
import { useContext } from 'react';
import dayjs from 'dayjs';
import InfoTable from './InfoTable';

function formatDateTime(v: number | string | undefined) {
  if (!v) return 'N/A';
  return dayjs(v).format('YYYY-MM-DD HH:mm:ss');
}

export default function CabTokenDisplay() {
  const { token, tokenMeta } = useContext(CabContext);
  return (
    <InfoTable
      rows={[
        {
          label: 'Token',
          value: (
            <>
              <span>{token?.value}</span>
              <button>copy</button>
            </>
          ),
        },
        {
          label: 'Expiring at',
          value: formatDateTime(token?.expireAt),
        },
        {
          label: 'Requested at',
          value: formatDateTime(tokenMeta?.requestedAt),
        },
        {
          label: 'Refreshed at',
          value: formatDateTime(tokenMeta?.refreshedAt),
        },
      ]}
    />
  );
}
