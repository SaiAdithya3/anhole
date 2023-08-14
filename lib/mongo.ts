import { MongoClient , GridFSBucket } from "mongodb";

declare global {
    var client: MongoClient | null;
    var bucket: GridFSBucket | null;
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

export async function connectToDb() { 
    if (global.client) {
      return {
        client: global.client,
        bucket: global.bucket!,
      };
    }
    
    const client = ( global.client = new MongoClient(MONGODB_URI!,{}));
    const bucket = (global.bucket = new GridFSBucket(client.db(),{
        bucketName: "images",
}));


await global.client.connect();
console.log("Connected to MongoDB");
return{client: global.client, bucket: global.bucket!};

}