import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Heading, Task } from './components';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { TiCancel } from 'react-icons/ti';
import moment from 'moment';
// import './app.scss';
import apis from './api';

const testTasks = [
  {
    _id: 1,
    description: "Do a task",
    completed: false
  },
  {
    _id: 2,
    description: "Do dishes",
    completed: true
  },
  {
    _id: 3,
    description: "Make bed",
    completed: false
  },
]

function App() {
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    apis.getTasks().then(res => {
      console.log("app:getTasks:: ", res)
      setTasks(res.data.output);
    }).catch(err => {
      console.error("error:: getTasks:", err)
    })
  }, [])

  const onAddTask = (event) => {
    var newTask = {_id: 'new', description: '', completed: false}
    setTasks(prevTasks => [...prevTasks, newTask]);
    onEditTask(newTask)
  }

  const onCheckTask = (taskToCheck) => {
    var allTasks = [...tasks]
    var targetTask = allTasks[tasks.indexOf(taskToCheck)]
    targetTask.completed = true
    setTasks(allTasks)
    apis.updateTask(taskToCheck._id, targetTask)
  }

  const onUncheckTask = (taskToUncheck) => {
    var allTasks = [...tasks]
    var targetTask = allTasks[tasks.indexOf(taskToUncheck)]
    targetTask.completed = false
    setTasks(allTasks)
    apis.updateTask(taskToUncheck._id, targetTask)
  }

  const onRemoveTask = (targetTask) => {
    setTasks(prevTasks => prevTasks.filter(task => task != targetTask))
    apis.deleteTask(targetTask._id)
  }

  const onEditTask = (targetTask) => {
    if (editingTask === targetTask) {
      setEditingTask(null)
    } else {
      setEditingTask(targetTask)
    }
  }

  const onConfirmEdit = async (updatedTask) => {
    // If task is blank -> delete it
    if (updatedTask.description === "" && editingTask.description === "") {
      onRemoveTask(editingTask)
      setEditingTask(null)
      return;
    }
    // If task wasn't blank but is after editing -> revert back
    else if (updatedTask.description === "" && editingTask.description !== "") {
      var allTasks = [...tasks]
      allTasks[tasks.indexOf(editingTask)] = editingTask
      setTasks(allTasks)
      setEditingTask(null)
      return;
    }

    // If task doesn't exist yet, create it
    if (updatedTask._id === 'new') {
      // Delete task _id so that a unique one is set by backend
      // (create a hard copy of local task so you don't cause any react key errors)
      const newTask = {...updatedTask}
      delete newTask._id;
      const res = await apis.createTask(newTask)
      updatedTask._id = res.data.output._id; // <- update local id in case we delete it or edit it
    }
    // else, update exisiting task
    else {
      apis.updateTask(updatedTask._id, updatedTask);
    }
    
    var allTasks = [...tasks]
    allTasks[tasks.indexOf(editingTask)] = updatedTask
    setTasks(allTasks)
    setEditingTask(null)
  }

  const onCancel = () => {
    setEditingTask(null)
  }

  const taskMenuItems = [
    {
        name: 'Rename',
        icon: <AiFillEdit className='' />,
        func: onEditTask
    },
    {
        name: 'Remove',
        icon: <AiFillDelete className='' />,
        func: onRemoveTask
    },
    {
        name: "Cancel",
        icon: <TiCancel className='' />,
        func: onCancel
    },
  ]

  return (
    <div className='App' onContextMenu={(e) => {
      e.preventDefault(); // disables right click / context menu behavior
    }}>
      
      <Container className='app-container'>
        <Row className='app-header'>
          <Col>
            <Heading subtext={`${tasks.filter(t => !t.completed).length} pending tasks left`} >{moment().format('dddd')}</Heading>
          </Col>
        </Row>

        {/* Need an extra container here wrapped around the button and task list to position btn */}
        <Row className='app-main-content d-flex justify-content-center'>
          <Col xs={11} lg={10} xl={6} className='task-container'>

            {/* Tasks go here */}
            <Row className='task-list'>
              <Col>
                {tasks.filter(t => !t.completed).map((task, taskIndex) => (
                  <Task editing={editingTask === task} onConfirmEdit={onConfirmEdit} onCheckTask={onCheckTask} key={`task-${task._id}`} task={task} taskIndex={taskIndex} taskMenuItems={taskMenuItems} />
                ))}
                {tasks.filter(t => t.completed).map((task, taskIndex) => (
                  <Task editing={editingTask === task} onConfirmEdit={onConfirmEdit} onCheckTask={onUncheckTask} key={`completed-task-${task._id}`} task={task} taskIndex={taskIndex} taskMenuItems={taskMenuItems} />
                ))}
              </Col>
            </Row>
            
            <Button variant='danger' className='rounded-circle add-task-btn shadow' onClick={onAddTask} >+</Button>
          </Col>
        </Row>

      </Container>
    </div>
  );
}

export default App;
