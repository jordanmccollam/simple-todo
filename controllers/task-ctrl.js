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

module.exports = {
    getTasks,
}