import { CreateSessionPayload, Session } from '.';
import { Repository } from '../../../../inferfaces';

export interface SessionRepository extends Repository<Session> {
  create: (payload: CreateSessionPayload) => Promise<Session>;
  findOne: (payload: Partial<Session>) => Promise<Session>;
  update: (payload: Partial<Session>) => Promise<Session>;
}
