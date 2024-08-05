import api from '@/lib/services';
import { Session } from 'next-auth';

export const createReservation = async (serviceId: string, session: Session) => {
  const authToken = session?.access_token;
  const url = `reservations/${serviceId}`;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await api.post(url, config);

    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
