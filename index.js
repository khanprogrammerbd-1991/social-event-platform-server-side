import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";

// 1. Configure dotenv
dotenv.config();

// 2. Create Express app
const app = express();

// 3. Middleware
app.use(cors({
  origin: "https://social-event-website-frontend.vercel.app", // Must be exactly this, no trailing slash
  credentials: true
}));

// 2. Mount the Better Auth route handler BEFORE express.json()
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

// 4. MongoDB connection
const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 8000;

// 5. Create MongoDB client
const client = new MongoClient(uri);

// 6. Connect to MongoDB
export async function connectToMongoDB() {
  try {
    await client.connect();

    console.log("You successfully connected to MongoDB!");

    // 7. Select database
    const db = client.db("socialeventDB");

    // 8. Select collection
    const eventsCollection = db.collection("events");

    return { db, eventsCollection };

  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err;
  }
}

// 9. Home API
app.get("/", (req, res) => {
  res.send("Welcome to the Social Event API!");
});

// NEW: POST API to Create an Event
app.post("/api/events", async (req, res) => {
  try {
    const eventData = req.body;
    
    // Access the database and collection
    const db = client.db("socialeventDB");
    const eventsCollection = db.collection("events");

    // Insert the new event into MongoDB
    const result = await eventsCollection.insertOne(eventData);
    
    res.status(201).send(result);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).send({ message: "Failed to create event" });
  }
});

//Get upcomming events
app.get("/api/events",async(req,res)=>{
  try {
    const db = client.db("socialeventDB");
    const eventsCollection = db.collection("events");

    const events = await eventsCollection.find({}).toArray();
    res.status(200).send(events);
  } catch(error){
    console.error("Error fetching events:", error);
    res.status(500).send({message:"Failed to fetch events"}); 
  }
})

//Get event by id
app.get("/api/events/:id",async(req, res)=>{
  try {
    const eventId = req.params.id;
    const db = client.db("socialeventDB");
    const eventsCollection = db.collection("events");
    const event = await eventsCollection.findOne({_id: new ObjectId(eventId)});
    if(event){
      res.status(200).send(event);
    } else {
      res.status(404).send({message:"Event not found"});
    }
  } catch(error){
    console.error("Error fetching event by ID:", error);
    res.status(500).send({message:"Failed to fetch event by ID"});
  }
})





// 10. Start server after database connection
async function startServer() {
  try {
    await connectToMongoDB();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

// 11. Execute the function
startServer();

export default app;