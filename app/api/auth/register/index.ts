import api from '@/lib/services';
import { Role } from '@/lib/utils';

type SignUpDataType = {
  fullName: string;
  email: string;
  nif: string;
  password: string;
  role: Role;
};

export const signUpUser = async (data: SignUpDataType) => {
  try {
    const response = await api.post('users', data);

    return response;
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);
  }
};
