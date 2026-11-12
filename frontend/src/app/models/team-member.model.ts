export interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl?: string | null;
  bio?: string | null;
  createdAt?: string;
}
