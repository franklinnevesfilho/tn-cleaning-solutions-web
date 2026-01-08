// lib/appwrite.ts
import { Client, Account, ID, Storage, TablesDB, Teams } from "appwrite";

const client = new Client();

// Replace with your Appwrite endpoint & project ID
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
  
// Appwrite services
const account = new Account(client);
const tablesDB = new TablesDB(client);
const storage = new Storage(client);
const teams = new Teams(client);

export { 
  ID,
  account,
  storage,
  tablesDB,
  teams
};
