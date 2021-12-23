export interface Repository<T> {
  find: (payload: Partial<T>) => Promise<T[]>;
  findOne: (payload: Partial<T>) => Promise<T>;
  create: (payload: T) => Promise<T>;
}
