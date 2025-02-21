import { z } from 'zod';

export const currencyExchangeSchema = z.object({
  fromCurrency: z.string().nonempty('From currency is required'),
  toCurrency: z.string().nonempty('To currency is required'),
  amount: z.number().min(0, 'Amount must be at least 0'),
});

export const defaultValues = {
  fromCurrency: '',
  toCurrency: '',
  amount: 0,
};
