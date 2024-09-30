const path = require("path");
const express = require("express");
const app = express();
const PORT = 4444;

const mongoose = require("mongoose");
const User=require("./models/UserModel")

app.use(express.urlencoded({ extended: true }));

app.use(async(req,res,next)=>{
  let user= await User.findOne({
    _id:'6644daeeda30c903a3117b7b'
  })
  req.user=user
  next()

})

//routes

const adminRouter = require("./routes/admin");
app.use("/admin", adminRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:` + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
