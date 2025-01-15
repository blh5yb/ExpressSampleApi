import { MongoClient } from "mongodb";
//const mongoose = require('mongoose');
import * as mongoose from 'mongoose';
const connectionString = process.env.ATLAS_URI || "";


//const client = new MongoClient(connectionString);
//let conn;
//try {
//  conn = await client.connect();
//} catch(e) {
//  console.error(e);
//  process.exit();
//}
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDb;