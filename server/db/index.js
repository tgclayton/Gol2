require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://gol2-user:${process.env.REACT_APP_MONGO_PASSWORD}@toms-to-do.zkt6p.mongodb.net/Saves?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client
    .connect()
    .then(() => { console.log('Connected to mongoDB') })
    .catch(e => {
        console.error('Connection error', e.message)
    })

module.exports = {
    addSave,
    getSaves,
    deleteSave
}

async function addSave(save) {
    const db = client.db('Gol2')
    try {
        const col = db.collection("Saves")
        await col.insertOne(save)
    }
    catch (err) {
        console.log(err.stack);
    }
}

async function deleteSave(data) {
    const db = client.db('Gol2')
    try {
        const col = db.collection("Saves")
        await col.deleteOne({"title": data.title})
        return 'success'
    }
    catch (err) {
        console.log(err.stack);
    }
}

async function getSaves() {
    const db = client.db("Gol2")
    const col = db.collection("Saves")
    const saves = await col.find({}).toArray()
    return saves
}

