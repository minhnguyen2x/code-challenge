import { Currency } from '@features/currency-exchange/components/currency';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>Fancy Form</div>
    <Currency />
  </StrictMode>
);
