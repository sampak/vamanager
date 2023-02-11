const token_name = 'access_token';

export const getToken = () => localStorage.getItem(token_name) ?? '';

export const setToken = (token: string) =>
  localStorage.setItem(token_name, token);

export const removeToken = () => localStorage.removeItem(token_name);
