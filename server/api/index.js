// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const TodoModel = require("./Models/Todo.js");

// const app = express();
// const PORT = 3001;

// app.use(express.json());
// app.use(cors(
//     {
//         origin: ["https://buggy-tracker-frontend.vercel.app"],
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         credentials: true
//     }
// ));

// app.get("/", (req, res) => {
//     res.json("hello");
// })


// // use this one to get local host server
// // app.use(cors());


// // use this one to get local host server
// // mongoose.connect('mongodb://127.0.0.1:27017/todoDB');
// mongoose.connect('mongodb+srv://matthewevwalker:Foutin1965@cluster0.q5ywvvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');




// app.get("/get", async (req, res) => {
//     try {
//         const todos = await TodoModel.find({});
//         res.json(todos);
//     } catch (err) {
//         console.error("Error getting todos:", err);
//         res.status(500).json({ error: "Error getting todos" });
//     }
// });

// // app.put("/edit/:id", async (req, res) => {
// //     const {id} = req.params;
// //     TodoModel.findById(id, (err, todo) => {{id: id}}, {done: true}).then((result) => res.json(result))
// //     .catch((err) => console.log(err));
// //     console.log(id);
// // })

// app.delete("/delete/:id", async (req, res) => {
//     const {id} = req.params;
//     TodoModel.findByIdAndDelete({_id: id})
//     .then((result) => res.json(result))
//     .catch((err) => console.log(err));
//     console.log(id);
// })

//     // try {
//     //     const id = req.body.id;
//     //     const todo = await Todo
//     //     Model.findById(id);
//     //     todo.done = !todo.done;
//     //     await todo.save();
//     //     res.json(todo);
//     // } catch (err) {
//     //     console.error("Error editing todo:", err);
//     //     res.status(500).json({ error: "Error editing todo" });
//     // }


// app.post("/add", async (req, res) => {
//     try {
//         const date = req.body.date;
//         const task = req.body.task;

//         const color = req.body.color;
//         const address = req.body.address;
//         console.log(req.body);

//         const newTodo = await TodoModel.create({ date: date, task: task, color: color,  address: address });
//         res.json(newTodo); // Send the newly created todo as response
//     } catch (err) {
//         console.error("Error adding new task:", err);
//         res.status(500).json({ error: "Error adding new task" });
//     }
// });


// // app.post("/add", async (req, res) => {
// //     try {
// //         // const task = req.body.task;
// //         // const address = req.body.address;
// //         // console.log(req.body);

// //         TodoModel.create(req.body).then((result) => res.json(Todo))
// //         // Send the newly created todo as response
// //     } catch (err) {
// //         console.error("Error adding new task:", err);
// //         res.status(500).json({ error: "Error adding new task" });
// //     }
// // });


// app.listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`);
// });


const express = require("express");
const { MongoClient, ObjectId } = require('mongodb');
const serverless = require('serverless-http');

const app = express();
const port = process.env.PORT || 3001; // Use the environment's port if available or default to 3001

// Enrique Note: Change this to yours
const allowedOrigins = ['https://buggy-tracker-frontend.vercel.app/'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(express.json());

// MongoDB connection URI
// Enrique Note: Change this to yours
const mongoUri = 'mongodb+srv://matthewevwalker:Foutin1965@cluster0.q5ywvvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

let todosCollection;

client.connect()
  .then(() => {
    console.log('MongoDB connected');
    // Enrique Note: Change this to yours make a db and add the collection
    const database = client.db('test'); // Make sure 'Cluster0' is your database name
    todosCollection = database.collection('todos');
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
  
app.get("/api/get", async (req, res) => {
  try {
    const todos = await todosCollection.find({}).toArray();
    res.json(todos);
  } catch (err) {
    console.error("Error getting todos:", err);
    res.status(500).json({ error: "Error getting todos" });
  }
});

app.post("/api/add", async (req, res) => {
  try {
    const { date, task, color, address } = req.body;
    const newTodo = { date, task, color, address };
    const result = await todosCollection.insertOne(newTodo);
    res.json(result.ops[0]); // Send the newly created todo as response
  } catch (err) {
    console.error("Error adding new task:", err);
    res.status(500).json({ error: "Error adding new task" });
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await todosCollection.deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ error: "Error deleting todo" });
  }
});

app.listen(port, () => {
  console.log(`Server ready on port ${port}.`);
});

module.exports = app;