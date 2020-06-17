export interface IRepository<T> {

    create(item: T): boolean;

    update(item: T): boolean;

    find(query: any): T[];

    findOne(query: any): T | null;

    findById(id: string): T | null;
}