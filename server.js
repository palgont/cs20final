const express = require('express');
const app = express();
app.use(express.static(__dirname));
const URL = 'mongodb+srv://mayhaali:SsLi5KuHuTDNaWK6@cluster0.j8ysx6r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const { MongoClient } = require('mongodb');
const path = require('path');

const PORT = process.env.PORT || 3000;

let db, collection;

// Connect to MongoDB and start the server
MongoClient.connect(URL)
  .then(client => {
    db = client.db('cookbook');
    collection = db.collection('recipes');
    app.listen(PORT);
  })
  .catch(err => console.error('MongoDB connection error:', err));

// route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'recipe.html'));
});

// fetch all data
app.get('/data', async (req, res) => {
  try {
    const recipes = await collection.find().toArray();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});