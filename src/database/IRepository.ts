export interface IRepository<T> {

    create(item: T): Promise<boolean>;

    update(item: T): Promise<boolean>;

    find(query: any): Promise<T[]>;

    findOne(query: any): Promise<T | null>;

    findById(id: string): Promise<T | null>;
}