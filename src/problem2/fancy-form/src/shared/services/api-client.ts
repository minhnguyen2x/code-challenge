import { Currency } from '@features/currency-exchange/types/currency';
import { ApiEndpoints } from '@shared/constants/api-endpoint';
import { aptviseApi } from '@shared/libs/axios/api/api';
import { APIResponse } from '@shared/types/api';

const createApi = () => {
  return {
    get: {
      async getPrices(): Promise<APIResponse<Currency[]>> {
        const response = await aptviseApi.get<APIResponse<Currency[]>>(
          ApiEndpoints.Currency.Price
        );

        return response.data;
      },
    },
    post: {},
    put: {},
    delete: {},
  };
};

export const apiClient = createApi();
