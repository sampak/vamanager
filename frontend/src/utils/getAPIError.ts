import { UseTranslationResponse } from 'react-i18next';

export const getAPIError = (
  err: any,
  translation: (key: string) => string
): string => {
  if (
    err &&
    err.response &&
    err.response.data.message &&
    !!err.response.data.message.length
  ) {
    return translation(`errors.${err.response.data.message}`);
  }
  return 'An error occurred, try again later.';
};
