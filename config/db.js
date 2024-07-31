// db.js
import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017/';
const dbName = 'school';

let db = null;

export const getDatabase = async () => {
  if (!db) {

    //const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const client = await MongoClient.connect(url);
    db = client.db(dbName);
  }
  return db;
};