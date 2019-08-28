import {Injectable} from "@nestjs/common";

const MongoClient = require('mongodb').MongoClient;

@Injectable()
export class MongoDBService {
    constructor() {
    }

    collection;

    public async init() {
        // const uri = "mongodb+srv://shmura:knasim15@shmuracluster-vx7fp.mongodb.net/test?retryWrites=true&w=majority";
        // MongoClient.connect(uri,  {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // }, function(err: any, client: any) {
        //     if(err) {
        //         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        //     }
        //     else {
        //         console.log('Connected...');
        //     }
        //     // const collection = client.db("RecieptsDataDB").collection("Receipt");
        //     // perform actions on the collection object
        //     // client.close();
        // });

        //
        // const url = process.env.MONGO_URI
        // const connection = await mongo.connect('mongodb+srv://shmura:knasim15@shmuracluster-vx7fp.mongodb.net/test?retryWrites=true&w=majority',
        //     { useNewUrlParser: true }, { useUnifiedTopology: true } )
        // console.log('connection', connection);
        // const db = connection.db('RecieptsDataDB');
        // this.collection = db.collection('Receipt')
    }

    public async saveDataInDb(dataObj) {
        const uri = "mongodb+srv://shmura:knasim15@shmuracluster-vx7fp.mongodb.net/test?retryWrites=true&w=majority";
        MongoClient.connect(uri,  {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function(err: any, client: any) {
            if(err) {
                console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
            }
            else {
                console.log('Connected...');
                this.client.insert(dataObj)
            }
            // const collection = client.db("RecieptsDataDB").collection("Receipt");
            // perform actions on the collection object
            // client.close();
        });

        console.log(this.collection);
        // this.collection.inse(dataObj)
    }
}
