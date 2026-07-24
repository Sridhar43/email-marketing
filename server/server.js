const dns =require('dns');
dns.setServers(['8.8.8.8','1.1.1.1']);


const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
 const cors =require("cors")

 


 
dotenv.config();
connectDB();

const app = express();

app.use(
  cors(
    {
      origin:"https://email-marketing-mwp9.onrender.com",
      credentials:true,
    }
  )
)

app.use(express.json());


 const dashboardRoutes = require("./routes/dashboardRoutes");
   app.use("/api/dashboard",dashboardRoutes);

//login and signup a dn middlewares
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// contacts
const contactRoutes=require("./routes/contactRoutes");
app.use("/api/contact",contactRoutes);

// audience
const audienceRoutes=require ("./routes/audienceRoutes");
app.use("/api/audience",audienceRoutes)

//compaign routes
const campaignRoutes=require("./routes/campaignRoutes");
app.use("/api/campaign",campaignRoutes)

//email
const emailRoutes =require("./routes/emailRoutes");
app.use("/api/email",emailRoutes);


app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})