import { setupWorker } from 'msw/browser';
import { handlers } from '@/_mocks/handlers/index';

export const worker = setupWorker(...handlers);
