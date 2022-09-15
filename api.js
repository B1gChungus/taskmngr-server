require("dotenv").config()
let mongoose = require("mongoose")

async function connectDB(uri) {
    return mongoose.connect(uri).then(() =>
        console.log("db connected")
    ).catch((err) =>
        console.log(err)
    )
}
async function start() {
    try {
        return await connectDB(process.env.MONGO_URI)
        //     await TaskScheme.create(jsonProducts)
        //     process.exit(0)
    } catch (lol) {
        console.log(lol)
        process.exit(1)
    }
}

const db = require("./taskscheme")
start()
//const jsonProducts = require("./products.json")


async function add(data) { // works
    let fullobj = { name: data.name, description: data.description, completed: data.completed }
    db.findOne(fullobj,function(err,obj){
        if(!obj){
            db.create(fullobj)
            console.log("added task", fullobj)
        }
    })
}
async function remove(data) {
    let fullobj = { name: data.name, description: data.description, completed: data.completed }
    db.findOne(fullobj,function(err,obj){
        if(obj){
            db.deleteOne(fullobj,function(err,obj){
                console.log("removed task", fullobj)
            })
        }
    })
}
async function change(data) {
    let fullobj = { name: data.name, description: data.description, completed: data.completed }
    db.findOne(fullobj, function (err, obj) {
        if(obj){
            db.updateOne(obj, { completed: !obj.completed },function(err,obj){
                console.log("updated task",fullobj)
            })
        }
    })
    //tasks[name].completed = !tasks[name].completed
}
async function get() {
    return await db.find()
}
module.exports = { add, remove, change, get }