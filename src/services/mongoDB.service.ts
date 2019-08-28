import {Injectable} from "@nestjs/common";

const mongo = require('mongodb');

@Injectable()
export class MongoDBService {
    constructor() {
    }

    collection;

    public async init() {
        const url = process.env.MONGO_URI
        const connection = mongo.connect(url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }).then((res) => {
            console.log('res', res);
            console.log('wertfgyhujikolp', connection);
            const db = connection.db('RecieptsDataDB');
            this.collection = db.collection('Receipt')
        }).catch((error) => {
            console.log('error', error)
        }).final()
    }

    public saveDataInDb(dataObj) {

        this.init();
        console.log('lololo');
        console.log(this.collection);
        // this.collection.inse(dataObj)
    }
}
