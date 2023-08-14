const express=require("express")
const cookieParser = require('cookie-parser');


const db=require("./models/index")
const { userRoute } = require("./routes/user.routes");
const { recepieRoute } = require("./routes/recepie.routes");

const app=express()

app.use(express.json())

app.get("/", (req,res)=>{
    res.status(200).send("Backend server")
})

app.use("/", userRoute)
app.use("/", recepieRoute)


db.sequelize.sync().then(() => {
    app.listen(4500, ()=>{
        console.log("server is running");
    })
}).catch((err) => {
    console.log(err.message)
});