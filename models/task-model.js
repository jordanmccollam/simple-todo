const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema(
    {
        description: { type: String, required: true },
        completed: { type: Boolean, required: true, default: false }
    },
    { timestamps: true },
);

module.exports = mongoose.model('tasks', Task);