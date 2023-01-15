const mongoose = require("mongoose")

const crudSchema = mongoose.Schema({
    name : String,
    email :String,
    age :Number,
    pass :String,
},{
    versionKey:false
})

const CrudModel = mongoose.model("user",crudSchema)

module.exports={
    CrudModel
}