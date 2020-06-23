import pg from "knex";
import config from "../config/config";
import { injectable } from "inversify";

@injectable()
export class databaseManager {
    private _knex: pg<any, unknown[]>;
    constructor() {
        this._knex = pg({
            client: 'pg',
            connection: config.databaseConnectionString,
            searchPath: ['knex', 'public'],
        });
    }
    getConnection() {
        return this._knex;
    }
    async initilize() {
        await this.createWoorkbooks();
        await this.createViews();
        await this.createUsers();
    }
    async createWoorkbooks() {
        await this._knex.schema.createTableIfNotExists("workbooks", table => {
            table.string("id");
            table.string("name");
            table.string("contentUrl");
            table.string("webpageUrl");
        })
    }
    async createViews() {
        await this._knex.schema.createTableIfNotExists("views", table => {
            table.string("id");
            table.string("name");
            table.string("url");
            table.json("tags")
        });
    }
    async createUsers() {
        await this._knex.schema.createTableIfNotExists("users", table => {
            table.string("name");
            table.string("email");
            table.string("hashedPassword")
        });
    }
}