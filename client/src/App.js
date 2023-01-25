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
    id: 1,
    description: "Do a task",
    completed: false
  },
  {
    id: 2,
    description: "Do dishes",
    completed: true
  },
  {
    id: 3,
    description: "Make bed",
    completed: false
  },
]

function App() {
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    apis.getTasks().then(res => {
      setTasks(res.data.output);
    }).catch(err => {
      console.error("error:: getTasks:", err)
    })
  }, [])

  const onAddTask = (event) => {
    var newTask = {id: 'new', description: '', completed: false}
    setTasks(prevTasks => [...prevTasks, newTask]);
    onEditTask(newTask)
  }

  const onCheckTask = (taskToCheck) => {
    var allTasks = [...tasks]
    allTasks[tasks.indexOf(taskToCheck)].completed = true
    setTasks(allTasks)
  }

  const onUncheckTask = (taskToUncheck) => {
    var allTasks = [...tasks]
    allTasks[tasks.indexOf(taskToUncheck)].completed = false
    setTasks(allTasks)
  }

  const onRemoveTask = (targetTask) => {
    setTasks(prevTasks => prevTasks.filter(task => task != targetTask))
  }

  const onEditTask = (targetTask) => {
    if (editingTask === targetTask) {
      setEditingTask(null)
    } else {
      setEditingTask(targetTask)
    }
  }

  const onConfirmEdit = (updatedTask) => {
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
    
    var allTasks = [...tasks]
    allTasks[tasks.indexOf(editingTask)] = updatedTask
    setTasks(allTasks)
    setEditingTask(null)

    // If task doesn't exist yet, create it
    if (updatedTask.id === 'new') {
      // Delete task id so that a unique one is set by backend
      // (create a hard copy of local task so you don't cause any react key errors)
      const newTask = {...updatedTask}
      delete newTask.id;
      apis.createTask(newTask)
    }
    // else, update exisiting task
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
