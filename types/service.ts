export interface ServiceType {
  id: string;
  name: string;
  description: string;
  price: number;

  provider: {
    fullName: string;
  };
}
