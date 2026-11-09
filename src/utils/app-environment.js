import { API_ENVIRONMENT } from '@env';

export const isStaging = API_ENVIRONMENT === 'staging';
export const storageKey = (key) => isStaging ? `@staging:${key}` : key;
export const complaintDraftKey = storageKey('@complaint');
