import { CabContext } from '@/contexts/CabContext';
import { ReactNode, useContext } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

function formatDateTime(v: number | string | undefined) {
  if (!v) return 'N/A';
  return dayjs(v).format('YYYY-MM-DD HH:mm:ss');
}

export default function DaBridgeInfo() {
  const ctx = useContext(CabContext);
  return (
    <div
      className={classNames(
        'grid grid-cols-[7em_1fr]',
        'm-2 rounded-md border border-slate-900',
        'shadow-md shadow-slate-800/30',
        'bg-slate-600 text-slate-50'
      )}
    >
      <InfoRow label="Token" value={ctx.token?.value} />
      <InfoRow label="Expire at" value={formatDateTime(ctx.token?.expireAt)} />
      <InfoRow
        label="Requested at"
        value={formatDateTime(ctx.tokenMeta?.requestedAt)}
      />
      <InfoRow
        label="Refreshed at"
        value={formatDateTime(ctx.tokenMeta?.refreshedAt)}
      />
    </div>
  );
}

interface RowProps {
  label: string;
  value: ReactNode;
}
function InfoRow({ label, value }: RowProps) {
  return (
    <>
      <span className="font-bold bg-slate-700 p-2 text-sm">{label}</span>
      <span className="font-mono p-2 break-all">{value}</span>
    </>
  );
}
