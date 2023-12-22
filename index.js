const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port =  process.env.PORT | 2626;
require('dotenv').config()
const cors = require('cors');
var cookieParser = require('cookie-parser')

app.use(cors({
  origin: ['http://localhost:5173', 'https://task-mangement-4530f.web.app/'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser()) ;




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
    });

    app.get("/tasks", async(req, res) => {
      const email = req.query.email;
      const query = {email: email}
      const cursor = taskCollection.find(query);
      const result = await cursor.toArray();
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