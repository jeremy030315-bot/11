export type ServiceType = 'feeding' | 'walking';

export interface PetOrder {
  id: string;
  type: ServiceType;
  petName: string;
  petType: 'cat' | 'dog';
  address: string;
  time: string;
  price: number;
  status: 'pending' | 'accepted' | 'completed';
  ownerId: string;
  providerId?: string;
  createdAt: number;
}

export interface UserProfile {
  id: string;
  name: string;
  role: 'owner' | 'provider';
  isVerified: boolean;
  avatar: string;
  rating: number;
  completedOrders: number;
}
