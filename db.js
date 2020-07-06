
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASS}@cluster0.hajzu.gcp.mongodb.net/resume?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectWithPromise = () => {
  return client.connect() 
}

const connect = () => connectWithPromise()

module.exports = {
  connect
}