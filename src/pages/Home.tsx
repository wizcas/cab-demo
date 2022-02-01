import { Link, Outlet } from 'react-router-dom';

export default function Home() {
  return (
    <div className="px-2">
      <h1 className="text-xl font-serif font-bold my-4">
        Which mock app would you like to embed?
      </h1>
      <nav className="ml-4 text-sm text-gray-600">
        <Link to="/da">Digital Ads</Link>
      </nav>
      <Outlet />
    </div>
  );
}
