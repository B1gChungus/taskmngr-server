const mongoose = require("mongoose")
const TaskSchema = new mongoose.Schema({
    name: {
        type: "string",
        require: [true, "must provide name"],
        trim: true,
        maxLength: [20, "name must be less than 20 chars"],

    },
    description: {
        type: "string",
        require: [true, "need descr"],
        maxLength: [500, "500 char lim for desc"]
    },
    completed: {
        type: Boolean,
        default: false,
    }
})
module.exports = mongoose.model("Task", TaskSchema)
//Model.find({ completed: true })