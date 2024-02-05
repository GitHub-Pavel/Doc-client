import { ACCESS_KEY, SERVER_URL } from 'configs';

export const getFetch = async (
  url: string,
  noJson = false,
  noError = false,
) => {
  const res = await fetch(SERVER_URL + url, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Access-Key': ACCESS_KEY,
    },
  });

  if (!res.ok && !noError) {
    throw await res.json();
  }

  if (noJson) return res;
  return res.json();
};

export const postFetch = async <T>(
  url: string,
  body: T,
  method = 'POST',
  noJson = false,
) => {
  const options: RequestInit = {
    method: method,
    body: JSON.stringify(body),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Key': ACCESS_KEY,
    },
  };
  const res = await fetch(SERVER_URL + url, options);

  if (!res.ok) {
    throw await res.json();
  }

  if (noJson) return res;
  return res.json();
};
