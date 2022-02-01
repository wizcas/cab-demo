import InfoTable, { NaCell } from '@/components/InfoTable';
import { CabContext } from '@/contexts/CabContext';
import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createContentReadyAction } from 'vendor/compass-app-bridge';

export default function DaTransactionWidget() {
  const [searchParams] = useSearchParams();
  const txnId = searchParams.get('transactionId');
  const { bridge } = useContext(CabContext);
  useEffect(() => {
    if (bridge) {
      bridge.dispatch(createContentReadyAction());
    }
  }, [bridge]);
  return (
    <InfoTable
      rows={[
        {
          label: 'Txn ID',
          value: txnId || <NaCell />,
        },
      ]}
    />
  );
}
