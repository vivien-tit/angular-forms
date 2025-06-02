export interface User {
  id: number;
  email: string;
  password: string; // Devrait être hashé en production
  name?: string;
  createdAt: Date;
}