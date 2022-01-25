import dayjs from 'dayjs';
import CabTokenDisplay from '@/components/CabTokenDisplay';

function formatDateTime(v: number | string | undefined) {
  if (!v) return 'N/A';
  return dayjs(v).format('YYYY-MM-DD HH:mm:ss');
}

export default function DaBridgeInfo() {
  return <CabTokenDisplay />;
}
