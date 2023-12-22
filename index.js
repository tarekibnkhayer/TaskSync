const express = require('express')
const app = express()
const port = 3000 | process.env.PORT;
require('dotenv').config()
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json()); 



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const taskCollection = client.db('task-sync').collection('tasks');
    app.post('/tasks', async(req, res) => {
      const task = req.body;
      const result = await taskCollection.insertOne(task);
      res.send(result);
    })
  } finally {

  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hellosl World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})