import {Injectable} from "@nestjs/common";

const MongoClient = require('mongodb').MongoClient;

@Injectable()
export class MongoDBService {
    constructor() {
    }

    public async saveDataInDb(dataObj) {
        const uri = `${process.env.MONGO_URI}`;
        MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function (err: any, client: any) {
            if (err) {
                console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
            } else {
                console.log('Connected...');
            }
            //TODO insert data to db
        });
    }
}
