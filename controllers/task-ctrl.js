const Task = require('../models/task-model');

getTasks = (req, res) => {
    Task.find({}, (err, tasks) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!tasks.length) {
            return res
                .status(404)
                .json({ success: false, error: `Error getting tasks` })
        }
        return res.status(200).json({ success: true, output: tasks })
    })
}

createTask = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide a task"
        })
    }

    const task = new Task(body)
    if (!task) {
        return res.status(400).json({
            success: false,
            error: "Something went wrong creating this task"
        })
    }

    task.save().then(() => {
        return res.status(201).json({
            success: true,
            message: "Task successfully created!",
            output: task
        })
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: ("Task not created due to error: ", err)
        })
    })
}

deleteTask = (req, res) => {
    console.log(req)
    Task.findOneAndDelete({ _id: req.params.id }, (err, task) => {
        if (!err) {
            return res.status(200).json({ success: true, output: req.params.id });
        } else {
            return res.status(400).json({ success: false, error: err });
        }
    })
}

module.exports = {
    getTasks,
    createTask,
    deleteTask
}