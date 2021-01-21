require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const uri = 'process.env.REACT_APP_MONGO_PASSWORD';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client
    .connect()
    .then(() => { console.log('Connected to mongoDB') })
    .catch(e => {
        console.error('Connection error', e.message)
    })

module.exports = {
}

// async function addUser(user) {
//     const db = client.db('To-do-data')
//     try {
//         const col = db.collection("users")
//         await col.insertOne(user)
//         // console.log('user added:', user)
//     }
//     catch (err) {
//         console.log(err.stack);
//     }
// }
