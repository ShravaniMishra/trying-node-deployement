const express = require('express');
const {CrudModel} = require("../models/book.model")
const fs = require("fs")


const BookRouter = express.Router()

const validator = (req,res,next)=>{
    if(req.method == "POST"){
        let data = req.body
        console.log(data);
        if(data.name && data.email && data.age && data.pass){
            if(typeof(data.name) == "string" && typeof(data.email) == "string" && typeof(data.age) == "number" && typeof(data.pass) == "string" ){
                next()
            }else{
                res.send({"err": "All the fields are not there"})
            }
        }else{
            res.send({"err": "All the fields are not there"})
        }
    }else{
       next() 
    }
}

BookRouter.use(validator)

BookRouter.get("/", async (req,res)=>{
    const useme = await CrudModel.find()
    // console.log("Able to see the post")
    res.send(useme)
})

BookRouter.post("/add",async (req,res)=>{
    try{
    let data = req.body
    let book = new CrudModel(data)
    await book.save()
    res.send(book)
    console.log("Some Books are Posted")

    }
    catch(err){
        console.log(err)
        console.log("Something went wrong")
    }
    
})

BookRouter.patch("/edit/:id", async (req,res)=>{
    const ID = req.params.id
    const payload = req.body
    try{
        await BookModel.findByIdAndUpdate({_id:ID},payload)
        // res.send(`Updated the Book data whose id is ${ID}`)

        fs.appendFile("./records.txt", `The document with id:${ID} been updated.\n`, function (err) {
            if (err) throw err;
            res.setHeader("Content-type","text/html")
            res.send(`Updated the Book data whose id is ${ID}`);
            console.log("Successful")
        }); 
    }catch(err){
        console.log(err)
        res.send({"err":"Something went wrong"})
    }
})


BookRouter.delete("/delete/:id", async (req,res)=>{
    const ID = req.params.id
    try{
        await BookModel.findByIdAndDelete({_id:ID})
        fs.appendFile("./records.txt", `The document with id:${ID} been deleted.\n`, function (err) {
            if (err) throw err;
            // res.setHeader("Content-type","text/html")
            res.send(`Deleted the Book data whose id is ${ID}`);
            console.log("Successful")
        }); 
        // res.send(`Deleted the Book data whose id is ${ID}`)
    }catch(err){
        console.log(err)
        res.send({"err":"Something went wrong"})
    }
})

module.exports = {
    BookRouter
}