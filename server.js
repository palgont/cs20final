const express = require('express');
const app = express();
const { MongoClient, ObjectId } = require('mongodb');
app.use(express.json());
app.use(express.static(__dirname));
const URL = 'mongodb+srv://mayhaali:SsLi5KuHuTDNaWK6@cluster0.j8ysx6r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const path = require('path');

const PORT = process.env.PORT || 3000;

let db, recipesCollection, usersCollection;

// Connect to MongoDB and start the server
MongoClient.connect(URL)
  .then(client => {
    db = client.db('cookbook');
    usersCollection = db.collection('users');
    recipesCollection = db.collection('recipes');
    cartCollection = db.collection('user_cart')
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

// route for the recipes page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/recipe.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'recipe.html'));
});

app.get("/order.html", (req, res)=> { 
  res.sendFile(path.join(__dirname, "order.html"));
}); 

// route for the form
app.get('/form.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.get('/cart.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'cart.html'));
});

// fetch recipes
app.get('/data', async (req, res) => {
  try {
    const recipes = await recipesCollection.find().toArray();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// Handle form submission
app.post('/submit', async (req, res) => {
  const recipe = req.body;
  await recipesCollection.insertOne(recipe);
  res.status(200).send('Recipe saved');
});

// Save user after login
app.post('/saveUser', async (req, res) => {
  const { id, email, name } = req.body;
  if (!id) return res.status(400).send('Missing user ID');

  await usersCollection.updateOne(
    { _id: id }, 
    { $setOnInsert: { email, name, bookmarked_recipes: [] }},
    { upsert: true }
  );
  res.sendStatus(200);
});

// Bookmark recipe
app.post('/bookmark', async (req, res) => {
  const { userId, recipeId } = req.body;
  if (!userId || !recipeId) {
    return res.status(400).send('Missing parameters');
  }

  await usersCollection.updateOne(
    { _id: userId },
    { $addToSet: { bookmarked_recipes: new ObjectId(recipeId) } }
  );
  res.sendStatus(200);
});

// Get bookmarks
app.get('/bookmarks/:userId', async (req, res) => {
  const userId = req.params.userId;

  const user = await usersCollection.findOne({ _id: userId });
  if (!user) return res.status(404).send('User not found');

  const bookmarks = await recipesCollection.find({ _id: { $in: user.bookmarked_recipes }}).toArray();
  res.json(bookmarks);
});

app.post('/fill_cart', async(req, res)=> { 
  const {user_id, num_plans, meal_plan} = req.body;
  console.log(req.body)
  console.log("Received data", user_id, num_plans, meal_plan); 
  try { 
    await cartCollection.insertOne( {user_id: req.body.user_id, 
     num_plans: req.body.num_plans,
     meal_option: req.body.meal_plan});
     res.json({message:"Cart filled successfully!"})
  } catch(err) { 
    console.error("Error inserting into mongo:", err);
    res.status(500).json({ error: "Error inserting into database" }); 
  }
  
})

app.get('/get_order', async (req, res) => { 
  console.log('got here in get order')
  try { 
    const userId = req.query.userId; 
    console.log("in try")
    console.log(userId);
    const order = await cartCollection.find({user_id: userId}).toArray(); 
    console.log(order[0].user_id)
    if (!order.length) { 
      return res.status(404).send({error: "Order not found"})
    }
    console.log("fetched")

    console.log("user_id", order[0].user_id)
    res.send(order)
  }catch (error) { 
    console.log(error); 
    res.status(500).send({error: 'Server error fetching order.'})
  }
})