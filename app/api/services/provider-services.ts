import api from '@/lib/services';
import { Session } from 'next-auth';

interface ServiceType {
  name: string;
  description: string;
  price: string;
}

export const createService = async (data: ServiceType, session: Session) => {
  const authToken = session?.access_token;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await api.post('services', data, config);

    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

export const editService = async (
  data: ServiceType,
  session: Session,
  serviceId: string
) => {
  const authToken = session?.access_token;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await api.patch(`services/${serviceId}`, data, config);

    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

export const deleteService = async (session: Session, serviceId: string) => {
  const authToken = session?.access_token;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await api.delete(`services/${serviceId}`, config);

    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
