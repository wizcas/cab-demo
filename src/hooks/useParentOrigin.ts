import { useSessionStorage } from 'react-use';

function isSelfOrigin(origin: string) {
  return origin.startsWith('http://localhost:');
}

export default function useParentOrigin(): string {
  let origin = document.referrer;
  const [lastOrigin, setLastOrigin] = useSessionStorage(
    'cab-demo-origin',
    origin
  );
  if (isSelfOrigin(origin)) {
    if (!isSelfOrigin(lastOrigin)) {
      // The page is hot reloaded thus has lost the parent referrer.
      // Try to use the last valid origin from the session storage.
      origin = lastOrigin;
    } else {
      throw new Error(
        'Cannot retrieve the parent origin for CAB. Please reload the page.'
      );
    }
  }

  if (origin.endsWith('/')) {
    origin = origin.slice(0, -1);
  }
  if (lastOrigin !== origin) {
    setLastOrigin(origin);
  }

  return origin;
}
