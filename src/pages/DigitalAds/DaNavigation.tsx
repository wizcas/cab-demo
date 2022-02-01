import { CabContext } from '@/contexts/CabContext';
import classNames from 'classnames';
import { useContext } from 'react';
import { useLocation } from 'react-use';

export default function DaNavigation() {
  const { bridge } = useContext(CabContext);
  const { href: backUrl, origin } = useLocation();

  async function handleToProfile(inNewTab: boolean) {
    await bridge?.dispatch({
      type: 'NAVIGATE',
      payload: {
        page: '/account/profile',
        target: inNewTab ? 'blank' : undefined,
        context: {
          backUrl,
        },
      },
    });
  }

  async function handleCreateTxn() {
    await bridge?.dispatch({
      type: 'NAVIGATE',
      payload: {
        street: 'demo test Street',
        city: 'Los Angeles',
        unit: '1',
        state: 'CA',
        zipCode: '90012',
      },
    });
  }

  async function handleToLayout(layout: 'main' | 'flow') {
    await bridge?.dispatch({
      type: 'NAVIGATE',
      payload: {
        // If you want to open DA in the page with sidebar, set frame to 'main'
        frame: layout,
        // Here goes the absolute URL of the target DA page
        url: `${origin}/da/navigation`,
        context: {
          backUrl,
        },
      },
    });
  }

  return (
    <div
      className={classNames(
        'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3',
        'px-8 py-4'
      )}
    >
      <button className={BUTTON_CLASS} onClick={() => handleToProfile(false)}>
        Profile settings <br />
        <span className="text-sm">
          in the <strong>current</strong> tab
        </span>
      </button>
      <button className={BUTTON_CLASS} onClick={() => handleToProfile(true)}>
        Profile settings <br />
        <span className="text-sm">
          in the <strong>new</strong> tab
        </span>
      </button>
      <button className={BUTTON_CLASS} onClick={() => handleToLayout('main')}>
        To <strong>Ads Main</strong> layout
      </button>
      <button className={BUTTON_CLASS} onClick={() => handleToLayout('flow')}>
        To <strong>Ads Flow</strong> layout
      </button>
      <button className={BUTTON_CLASS} onClick={() => handleCreateTxn()}>
        Create a transaction
      </button>
    </div>
  );
}

const BUTTON_CLASS = classNames('p-4 min-h-[4rem]');
