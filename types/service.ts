export interface ServiceType {
  id: string;
  name: string;
  description: string;
  price: number;

  provider: {
    fullName: string;
  };
}

export interface ReservationType {
  date: Date;
  id: string;
  canceled: boolean;
  service: ServiceType;
}
