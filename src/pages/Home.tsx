import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      Select the embedded app
      <ul>
        <li>
          <Link to="/digital-ads">Digital Ads</Link>
        </li>
      </ul>
    </div>
  );
}
