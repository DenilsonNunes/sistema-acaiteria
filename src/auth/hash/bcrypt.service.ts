import { HashingServiceProtocol } from './hashing.service';
import * as bcrypt from 'bcrypt';

export class BcryptService extends HashingServiceProtocol {
  // Metodo para criar o hash na senha
  async hash(senha: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(senha, salt);
  }

  // Metodo para comparar senha enviada com a registrada no banco
  async compare(senha: string, senhaHash: string): Promise<boolean> {
    return await bcrypt.compare(senha, senhaHash);
  }
}
