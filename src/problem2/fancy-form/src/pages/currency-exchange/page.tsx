import {
  currencyExchangeSchema,
  defaultValues,
} from '@features/currency-exchange/schemas/exchange-currency-schema';
import { CurrencyExchangeForm } from '@features/currency-exchange/types/currency-exchange-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { apiClient } from '@shared/services/api-client';
import { useQuery } from '@tanstack/react-query';
import { FC, useMemo, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

export const CurrencyExchangePage: FC = () => {
  const [convertedValue, setConvertedValue] = useState<number | string>('');
  const methods = useForm<CurrencyExchangeForm>({
    resolver: zodResolver(currencyExchangeSchema),
    defaultValues,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { data: currencyPrices, isSuccess } = useQuery({
    queryFn: () => apiClient.get.getPrices(),
    queryKey: ['getPrices'],
  });

  const uniqueCurrenciesData = useMemo(() => {
    if (!currencyPrices?.data) return [];
    return Array.from(
      new Map(currencyPrices.data.map((item) => [item.currency, item])).values()
    );
  }, [currencyPrices?.data]);

  const onSubmit = (data: CurrencyExchangeForm) => {
    if (!isSuccess || !currencyPrices) return;

    const priceFrom = uniqueCurrenciesData.find(
      (item) => item.currency === data.fromCurrency
    )?.price;
    const priceTo = uniqueCurrenciesData.find(
      (item) => item.currency === data.toCurrency
    )?.price;

    if (priceFrom && priceTo) {
      const converted = data.amount * (priceFrom / priceTo);
      setConvertedValue(converted);
    } else {
      setConvertedValue('N/A');
    }
  };

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <Stack
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'background.default',
      }}
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        sx={{ p: 4, bgcolor: 'common.white', boxShadow: 3, borderRadius: 2 }}
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography
              variant="h2"
              sx={(theme) => ({
                color: theme.palette.primary.main,
                textAlign: 'center',
              })}
            >
              Currency Exchange
            </Typography>
            <Stack spacing={2}>
              <Controller
                name="fromCurrency"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    {...field}
                    label="From Currency"
                    error={!!errors.fromCurrency}
                    helperText={errors.fromCurrency?.message}
                    fullWidth
                  >
                    {uniqueCurrenciesData.map((currency) => (
                      <MenuItem
                        key={currency.currency}
                        value={currency.currency}
                      >
                        {currency.currency}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Amount"
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    fullWidth
                    value={field.value || ''}
                  />
                )}
              />
              <Controller
                name="toCurrency"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    {...field}
                    label="To Currency"
                    error={!!errors.toCurrency}
                    helperText={errors.toCurrency?.message}
                    fullWidth
                  >
                    {uniqueCurrenciesData.map((currency) => (
                      <MenuItem
                        key={currency.currency}
                        value={currency.currency}
                      >
                        {currency.currency}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              <TextField
                label="Converted Amount"
                value={convertedValue}
                InputProps={{ readOnly: true }}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Exchange
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Stack>
    </Stack>
  );
};
