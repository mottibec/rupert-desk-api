export interface IRepository<T> {

    create(item: T): Promise<boolean> ;

    find(query: any): Promise<T[]>;

    findById(id: string): Promise<T | null>;
}