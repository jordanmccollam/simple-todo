const express = require('express');

const TaskCtrl = require('./controllers/task-ctrl');

const router = express.Router();

// TASKS
router.post('/task', TaskCtrl.createTask);
router.put('/task/:id', TaskCtrl.updateTask);
router.delete('/task/:id', TaskCtrl.deleteTask);
// router.get('/entry/:id', TaskCtrl.getEntry);
router.get('/tasks', TaskCtrl.getTasks);

module.exports = router;