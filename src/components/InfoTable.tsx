import classNames from 'classnames';
import { ReactNode } from 'react';

interface Props {
  rows?: InfoRowData[];
  className?: string;
}

export default function InfoTable({ rows, className }: Props) {
  return (
    <div
      className={classNames(
        'grid grid-cols-[7em_1fr]',
        'rounded-md border border-slate-900',
        'shadow-md shadow-slate-800/30',
        'bg-slate-600 text-slate-50',
        className
      )}
    >
      {rows?.map((row) => (
        <InfoRow key={row.key} label={row.label} value={row.value} />
      ))}
    </div>
  );
}

export interface InfoRowData {
  key: string;
  label: string;
  value: ReactNode;
}
function InfoRow({ label, value }: InfoRowData) {
  return (
    <>
      <span className="font-bold bg-slate-700 p-2 text-sm">{label}</span>
      <span className="font-mono p-2 break-all">{value}</span>
    </>
  );
}

export function NaCell() {
  return <span className="text-red-300">N/A</span>;
}
