import dayjs from 'dayjs';
import CabTokenDisplay from '@/components/CabTokenDisplay';
import { useContext } from 'react';
import { CabContext } from '@/contexts/CabContext';

export default function DaHome() {
  const { bridge } = useContext(CabContext);

  async function gotoProfile(inNewTab: boolean) {
    await bridge?.dispatch({
      type: 'NAVIGATE',
      payload: {
        page: '/account/profile',
        target: inNewTab ? 'blank' : undefined,
        context: {
          backUrl: window.location.href,
        },
      },
    });
  }
  return (
    <div>
      <CabTokenDisplay />
      <div>
        <button onClick={() => gotoProfile(false)}>
          Profile settings <br />
          <span className="text-sm">
            in the <strong>current</strong> tab
          </span>
        </button>
        <button onClick={() => gotoProfile(true)}>
          Profile settings <br />
          <span className="text-sm">
            in the <strong>new</strong> tab
          </span>
        </button>
        <button>
          To <strong>Ads Main</strong> layout
        </button>
        <button>
          To <strong>Ads Flow</strong> layout
        </button>
        <button>Create a transaction</button>
        <button>Get flags</button>
      </div>
    </div>
  );
}
