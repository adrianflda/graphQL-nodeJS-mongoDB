import * as express from 'express'
import * as mongoose from 'mongoose';

class App {

    public app: express.Application;
    public mongoUrl: string;

    constructor() {
        this.app = express();

        this.mongoUrl = "mongodb://localhost/crn";
        this.mongoSetup();
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }
}

export default new App().app;
