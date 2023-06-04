const express = require("express");
const mongoose = require("mongoose"); // for MongoDB
const admin = require("firebase-admin"); // for Firebase
const { Pool } = require("pg"); // for PostgreSQL

// Create an Express server
const app = express();

// Configure MongoDB connection
const mongoURI =
  "mongodb+srv://Pranjan:pranjan123@cluster0.4sg7z.mongodb.net/stackanalyzer?retryWrites=true&w=majority";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Configure Firebase connection
const firebaseServiceAccount = require("./firebase.json");
admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccount),
});
const firestoreDB = admin.firestore();

// Configure PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "user_db",
  password: "root",
  port: 5432,
});

// Define a route for MongoDB operations
app.get("/mongo", (req, res) => {
  const start = Date.now();
  // Perform MongoDB operations here
  // Example: querying a collection
  const collection = db.collection("mycollection");
  collection.find({}).toArray((err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error querying MongoDB" });
    }
    const elapsed = Date.now() - start;
    res.json({ result, elapsed });
  });
});

// Define a route for Firebase operations
app.get("/firebase", (req, res) => {
  const start = Date.now();
  // Perform Firebase operations here
  // Example: querying a collection
  firestoreDB
    .collection("mycollection")
    .get()
    .then((snapshot) => {
      const result = snapshot.docs.map((doc) => doc.data());
      const elapsed = Date.now() - start;
      res.json({ result, elapsed });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error querying Firebase" });
    });
});

// Define a route for PostgreSQL operations
app.get("/postgres", (req, res) => {
  const start = Date.now();
  // Perform PostgreSQL operations here
  // Example: querying a table
  pool.query("SELECT * FROM mytable", (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error querying PostgreSQL" });
    }
    const elapsed = Date.now() - start;
    res.json({ result: result.rows, elapsed });
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
