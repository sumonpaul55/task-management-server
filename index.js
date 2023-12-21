const express = require("express")
const app = express();
const cors = require("cors")
require('dotenv').config();
// const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;
app.use(cors({
    // firebase link
    origin: ["http://localhost:5000"],
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