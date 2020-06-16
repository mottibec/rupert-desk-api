import mongoose from "mongoose";
import config from "../config/config";
import { injectable } from "inversify";

@injectable()
export default class dbManager {
    private _mongooseConnection!: mongoose.Connection;

    constructor() {
        this.connect();
    }
    async connect() {
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', true);
        await mongoose.connect(config.databaseUrl, { useNewUrlParser: true })
            .catch(err => console.log('Error while connection to the database', err));
        this._mongooseConnection = mongoose.connection;
    }
    async close() {
        await mongoose.connection.close()
        .catch(err => console.log('Error while closing the database', err))
    }
    public get mongooseConnection(): mongoose.Connection {
        return this._mongooseConnection;
    }

}