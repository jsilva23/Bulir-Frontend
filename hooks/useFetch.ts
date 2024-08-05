import { Session } from 'next-auth';
import api from '@/lib/services';
import useSWR from 'swr';

export function useFetch<Data = any>(url: string, session: Session) {
  const authToken = session?.access_token;

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  };

  const { data, error, isLoading, mutate } = useSWR<Data>(
    url,
    async (url: string) => {
      const response = await api.get(url, config);

      return response.data;
    }
  );

  return { data, error, isLoading, mutate };
}
