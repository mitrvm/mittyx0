import ReactDOM from 'react-dom/client';
import { Provider } from './providers';
import '@fontsource/inter/500.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider />,
);