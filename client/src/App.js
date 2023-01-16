import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Heading, Task, MenuContext } from './components';
import { BsCheck2All } from 'react-icons/bs';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { TiCancel } from 'react-icons/ti';
import moment from 'moment';
// import './app.scss';

const testTasks = [
  {
    description: "Do a task",
    completed: false
  },
  {
    description: "Do dishes",
    completed: true
  },
  {
    description: "Make bed",
    completed: false
  },
]

function App() {
  const [tasks, setTasks] = useState(testTasks)
  const [completedTasks, setCompletedTasks] = useState([])
  const [taskMenuData, setTaskMenuData] = useState({
    x: 0,
    y: 0,
    show: false,
    task: null
  })

  const onAddTask = (event) => {
    closeContextMenu()
    var newTask = {description: "NEW TASK", completed: false}
    setTasks(prevTasks => [...prevTasks, newTask]);
  }

  const onCheckTask = (taskToCheck) => {
    closeContextMenu()
    var allTasks = [...tasks]
    allTasks[tasks.indexOf(taskToCheck)].completed = true
    setTasks(allTasks)
  }

  const onUncheckTask = (taskToUncheck) => {
    closeContextMenu()
    var allTasks = [...tasks]
    allTasks[tasks.indexOf(taskToUncheck)].completed = false
    setTasks(allTasks)
  }

  const onRemoveTask = () => {
    closeContextMenu()
    setTasks(prevTasks => prevTasks.filter(task => task != taskMenuData.task))
  }

  const closeContextMenu = () => {
    if (taskMenuData.show) {
      setTaskMenuData({...taskMenuData, show: false})
    }
  }

  const onRenameTask = () => {
    closeContextMenu()
    console.log('Renaming Task')
  }

  const taskMenuItems = [
    {
        name: 'Rename',
        icon: <AiFillEdit className='' />,
        func: () => onRenameTask()
    },
    {
        name: 'Remove',
        icon: <AiFillDelete className='' />,
        func: () =>  onRemoveTask()
    },
    {
        name: "Cancel",
        icon: <TiCancel className='' />,
        func: () =>  closeContextMenu()
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
                  <Task onCheckTask={onCheckTask} onExpandMenu={setTaskMenuData} key={`task-${task.description}-${taskIndex}`} task={task} taskIndex={taskIndex} />
                ))}
                {tasks.filter(t => t.completed).map((task, taskIndex) => (
                  <Task onCheckTask={onUncheckTask} onExpandMenu={setTaskMenuData} key={`completed-task-${task.description}-${taskIndex}`} task={task} taskIndex={taskIndex} />
                ))}
              </Col>
            </Row>
            
            <Button variant='danger' className='rounded-circle add-task-btn shadow' onClick={onAddTask} >+</Button>
          </Col>
        </Row>

      </Container>

      {/* (Right click menu) */}
      <MenuContext menuItems={taskMenuItems} data={taskMenuData} />
    </div>
  );
}

export default App;
