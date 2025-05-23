import express from 'express';
import { connectDB } from './lib/db.js';

import "dotenv/config"; 
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js'
import cors from "cors"
import path from "path"



const app = express();
const PORT = process.env.PORT 

const __dirname = path.resolve();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true // allow front to send the cokkies
}))

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/chat",chatRoutes)


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
  


   app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

}

connectDB()

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
     
})