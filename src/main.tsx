import { App } from 'app';
import EventEmitter from 'event-emitter';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import './styles/globals.scss';

const queryClient = new QueryClient();
export const appEmitter = EventEmitter();

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
