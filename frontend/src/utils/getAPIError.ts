import { UseTranslationResponse } from 'react-i18next';

export const getAPIError = (
  err: any,
  translation: (key: string) => string
): string => {
  if (
    err &&
    err.response &&
    err.response.data.message &&
    !!err.response.data.message.length &&
    err.response.data.message !== 'Forbidden resource'
  ) {
    return translation(`errors.${err.response.data.message}`);
  }

  if (err.response.statusText === 'Forbidden') {
    return translation(`errors.forbidden`);
  }
  return 'An error occurred, try again later.';
};
