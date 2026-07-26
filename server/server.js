const dns =require('dns');
dns.setServers(['8.8.8.8','1.1.1.1']);


import  express from "express";
import dotenv from "dotenv";
import connectDB from  "./config/database.js";
 import cors from ("cors")

 


 
dotenv.config();
connectDB();

const app = express();

app.use(cors( )
);
{/* app.use(
  cors(
    {
      origin:"https://email-marketing-mwp9.onrender.com",
  

      
      credentials:true,
    }
  )
); */}

app.use(express.json());


 const dashboardRoutes = require("./routes/dashboardRoutes");
   app.use("/api/dashboard",dashboardRoutes);

//login and signup a dn middlewares
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// contacts
import  contactRoutes from "./routes/contactRoutes.js";
app.use("/api/contact",contactRoutes);

// audience
import  audienceRoutes from  "./routes/audienceRoutes.js";
app.use("/api/audience",audienceRoutes)

//compaign routes
import  campaignRoutes from "./routes/campaignRoutes.js";
app.use("/api/campaign",campaignRoutes)

//email
import  emailRoutes from  "./routes/emailRoutes.js";
app.use("/api/email",emailRoutes);


app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})