import ReactDOM from 'react-dom/client';
import { Provider } from './providers';
import '../i18n';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider />,
);
