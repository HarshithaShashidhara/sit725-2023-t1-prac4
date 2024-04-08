// Required modules
const express = require("express");
const { MongoClient } = require("mongodb");

// Express app initialization
const app = express();
const PORT = process.env.PORT || 3003;

// MongoDB URI
const uri = "mongodb+srv://harshitha28111999:StGl7GWh6aLYeB83@cluster0.myn2ntp.mongodb.net/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// MongoDB collection variable
let collection;

// Connect to MongoDB and assign the "Cat" collection
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully");
        const database = client.db("cards");
        collection = database.collection("Cat");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectToMongoDB();

// Setting up Express App
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Root route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route to fetch all cards from the database
app.get('/api/cards', async (req, res) => {
    try {
        const cards = await getAllCards();
        res.json({ statusCode: 200, data: cards, message: "Success" });
    } catch (error) {
        console.error("Error fetching cards:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to add a new card to the database
app.post('/api/cards', async (req, res) => {
    try {
        const card = req.body;
        await postCard(card);
        res.status(201).json({ statusCode: 201, data: card, message: "Card added successfully" });
    } catch (error) {
        console.error("Error adding card:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Function to insert a new card document into the MongoDB collection
async function postCard(card) {
    await collection.insertOne(card);
}

// Function to fetch all card documents from the MongoDB collection
async function getAllCards() {
    return await collection.find({}).toArray();
}

// Starting the Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
