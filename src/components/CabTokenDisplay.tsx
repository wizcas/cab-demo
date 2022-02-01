import { CabContext } from '@/contexts/CabContext';
import { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import InfoTable, { NaCell } from './InfoTable';
import { useCopyToClipboard } from 'react-use';

function formatDateTime(v: number | string | undefined) {
  if (!v) return 'N/A';
  return dayjs(v).format('YYYY-MM-DD HH:mm:ss');
}

interface Props {
  className?: string;
}

export default function CabTokenDisplay({ className }: Props) {
  const { token, tokenMeta } = useContext(CabContext);
  const [copied, setCopied] = useState(false);
  const [_, copy] = useCopyToClipboard();
  const tokenValue = token?.value;
  const truncatedTokenValue =
    tokenValue?.slice(0, 8) + ' ... ' + tokenValue?.slice(-8);

  useEffect(() => {
    setCopied(false);
  }, [tokenValue]);

  function handleCopy() {
    if (tokenValue) {
      copy(tokenValue);
      setCopied(true);
    }
  }

  return (
    <InfoTable
      className={className}
      rows={[
        {
          label: 'Token',
          value: tokenValue ? (
            <>
              <span>{truncatedTokenValue}</span>
              <button
                className="text-sm text-black px-1 py-0 ml-2"
                onClick={() => {
                  token?.value && copy(token?.value);
                }}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </>
          ) : (
            <NaCell />
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
