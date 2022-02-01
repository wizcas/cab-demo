import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import routes from './routes';

function Root() {
  return <BrowserRouter>{routes}</BrowserRouter>;
}

ReactDOM.render(<Root />, document.getElementById('root'));
