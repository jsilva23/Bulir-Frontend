import api from '@/lib/services';
import { Session } from 'next-auth';

interface ReserveType {
  date: Date;
}

export const createReservation = async (
  serviceId: string,
  data: ReserveType,
  session: Session
) => {
  const authToken = session?.access_token;
  const url = `reservations/${serviceId}`;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await api.post(url, data, config);

    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

export const editReservation = async (
  reserveId: string,
  data: ReserveType,
  session: Session
) => {
  const authToken = session?.access_token;
  const url = `reservations/${reserveId}/update`;
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

export const cancelReservation = async (
  reserveId: string,

  session: Session
) => {
  const authToken = session?.access_token;
  const url = `reservations/${reserveId}/cancel`;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await api.patch(url, {}, config);

    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
