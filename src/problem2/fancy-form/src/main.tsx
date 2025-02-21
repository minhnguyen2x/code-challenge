import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import { queryClient } from '@shared/libs/react-query/query-client';
import { QueryClientProvider as ReactQueryQueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CurrencyExchangePage } from '@pages/currency-exchange/page';

import('./_mocks/browser').then(({ worker }) => {
  worker.start();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <ReactQueryQueryClientProvider client={queryClient}>
      <CurrencyExchangePage />
    </ReactQueryQueryClientProvider>
  </StrictMode>
);
