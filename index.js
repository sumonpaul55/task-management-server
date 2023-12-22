const express = require("express")
const app = express();
const cors = require("cors")
require('dotenv').config();
// const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;
app.use(cors({
    // firebase link
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nrfwsc1.mongodb.net/?retryWrites=true&w=majority`;

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
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        const usersCollections = client.db("taskManagement").collection("users")
        const todosCollections = client.db("taskManagement").collection("allTodos")
        // getting all users
        app.get("/allusers", async (req, res) => {
            const result = (await usersCollections.find().toArray()).reverse();
            res.send(result)
        })
        // getting mytodos api
        app.get("/myTodos", async (req, res) => {
            try {
                const email = req.query.email
                const query = { email: email }
                // console.log(query)
                const result = (await todosCollections.find(query).toArray()).reverse()
                res.send(result)
            }
            catch (err) {
                res.send(err)
            }
        })
        app.get("/myTodoslist", async (req, res) => {
            try {
                const email = req.query.email
                const query = { email: email }
                // console.log(query)
                const result = (await todosCollections.find(query).toArray()).reverse()
                res.send(result)
            }
            catch (err) {
                res.send(err)
            }
        })

        app.post("/login", async (req, res) => {
            const userInfo = req.body;
            const query = { email: userInfo.email }
            console.log(query)
            const existUser = await usersCollections.findOne(query)
            if (existUser) {
                return res.send({ message: "Welcome Back" })
            }
            const result = await usersCollections.insertOne(userInfo)
            res.send(result)

        })

        app.post("/add-todos", async (req, res) => {
            try {
                const todos = req.body;
                const result = await todosCollections.insertOne(todos)
                res.send(result)
            }
            catch (err) {
                res.send(err)
            }
        })

        // delete todos
        app.delete('/deletetodos/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await todosCollections.deleteOne(query)
            res.send(result)
        })

        // update task todos
        app.put('/updatetask/:id', async (req, res) => {
            const updatedStatus = req.body
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {
                    status: updatedStatus.status
                },
            };
            const result = await todosCollections.updateOne(filter, updateDoc)
            res.send(result)
        })



































        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);
























app.listen(port, () => {
    console.log(`Task-management server running on the port ${port}`)
})