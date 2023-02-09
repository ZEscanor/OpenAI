import express from "express";

import * as dotenv from "dotenv";

import cors from "cors";

import connectDB from "./mongodb/connect.js";

import postRoutes from "./routes/postRoutes.js";
import openAiRoutes from "./routes/openAiRoutes.js";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/openai', openAiRoutes)



app.get('/', async(req,res)=>{
    res.send("Hello pardner");
})

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try{
        connectDB(process.env.MONGODB_URL)
        app.listen(PORT, () => console.log(`${PORT}`))
    }

    catch (error){
        console.log(error)
    }
    
}

startServer();

export default app;
