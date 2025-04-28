const {MongoClient} = require('mongodb');
var readline = require('readline'); 
var fs = require('fs'); 

const connStr= "mongodb+srv://Osinachi:lordofhosts@cluster0.enps8.mongodb.net/"
const client = new MongoClient(connStr);

async function run(){ 
  try { 
    await client.connect();
    console.log("Connected to mongo!")
    var dbo = client.db("Stock");
    return dbo.collection('PublicCompanies');     

    } catch (dbErr){ 
        console.log("Database error: " + dbErr);
        process.exit(1); 
    }
}
module.exports = run;

