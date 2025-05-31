export interface JwtPayload {
  user: number; // ID do usuário
  iat?: number; // Data de emissão (opcional)
  exp?: number; // Data de expiração (opcional)
  aud: string;
  iss: string;
}
