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
        await this._knex.schema.createTable("workbooks", table => {
            table.string("id");
            table.string("name");
            table.string("contentUrl");
            table.string("webpageUrl");
        })
    }
    async createViews() {
        await this._knex.schema.createTable("views", table => {
            table.string("id");
            table.string("name");
            table.string("url");
            table.json("tags")
        });
    }
    async createUsers() {
        await this._knex.schema.createTable("users", table => {
            table.increments("id");
            table.string("name");
            table.string("email");
            table.json("hashedPassword")
        });
    }
}