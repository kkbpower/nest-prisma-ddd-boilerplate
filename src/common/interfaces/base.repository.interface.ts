export default interface BaseRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  create(data: T): Promise<T>;
  update(id: string, data: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}