const express =require("express")

require("dotenv").config()
const {connection} = require("./config/db")
const {BookRouter} = require("./routes/book.route")


const app = express()

app.use(express.json())

app.use(cors({
    origin:"*"
}))

app.get("/",(req,res)=>{
    res.send("Welcome to Book App Store")
})

app.use("/book",BookRouter)

app.listen(3500,async ()=>{
    try{
        await connection
        console.log("Book App is Added")
    }catch(err){
        console.log(err)
        console.log("Something went wrong:"+err)
    }
    console.log("Running at port 3500")
})