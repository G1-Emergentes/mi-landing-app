export interface StoreContact {
  id: number;
  storeName: string;
  representative: string;
  email: string;
  phone?: string | null;
  websiteSocial?: string | null;
  message: string;
  createdAt: string;
}

export interface StoreContactInput {
  storeName: string;
  representative: string;
  email: string;
  phone?: string;
  websiteSocial?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  data: StoreContact;
  message?: string;
}
