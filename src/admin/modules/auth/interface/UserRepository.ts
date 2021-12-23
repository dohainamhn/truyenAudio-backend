import { Repository } from '../../../../inferfaces';
import { CreateUserPayload } from './CreateUserPayload';
import { User } from './User';

export interface UserRepository extends Repository<User> {
  create: (payload: CreateUserPayload) => Promise<User>;
  findOne: (payload: Partial<User>) => Promise<User>;
}
