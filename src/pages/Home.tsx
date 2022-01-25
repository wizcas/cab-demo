import { Link, Outlet } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      Select the embedded app
      <nav>
        <Link to="/da">Digital Ads</Link>
      </nav>
      <Outlet />
    </div>
  );
}
