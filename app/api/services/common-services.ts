import api from '@/lib/services';
import { Session } from 'next-auth';

interface ReserveType {
  balance: string;
}

export const deposit = async (
  data: ReserveType,
  session: Session
) => {
  const authToken = session?.access_token;
  const url = `users/deposit`;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await api.patch(url, data, config);

    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
