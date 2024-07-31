import { getDatabase } from "./config/db.js";
var collectionName =  'customers';

export const createCustomer = async (customer) => {
    const db = await getDatabase();
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(customer);
    return result.ops[0];
  };
  


  export const getCustomerByCusId = async (cusid) => {
    const db = await getDatabase();
    const collection = db.collection(collectionName);
    const customer = await collection.findOne({ cusid });
    return customer;
  };
  
  export const getCustomer = async (id) => {
    const db = await getDatabase();
    const collection = db.collection(collectionName);
    const customer = await collection.findOne({ cusid: new ObjectId(id) });
    return customer;
  };
  
  export const updateCustomer = async (id, update) => {
    const db = await getDatabase();
    const collection = db.collection(collectionName);
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: update });
    return result.modifiedCount > 0;
  };
  
  export const deleteCustomer = async (id) => {
    const db = await getDatabase();
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  };
  
  export const listCustomers = async () => {
    const db = await getDatabase();
    const collection = db.collection(collectionName);
    const customers = await collection.find({}).toArray();
    return customers;
  };