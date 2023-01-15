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
    description: "Do a task"
  },
  {
    description: "Do dishes"
  },
  {
    description: "Make bed"
  },

  // {
  //   task: "Make bed"
  // },
  // {
  //   task: "Make bed"
  // },
  // {
  //   task: "Make bed"
  // },
  // {
  //   task: "Make bed"
  // },
  // {
  //   task: "Make bed"
  // },
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
    var newTask = {description: "NEW TASK"}
    setTasks(prevTasks => [...prevTasks, newTask]);
  }

  const onCheckTask = (taskToCheck) => {
    closeContextMenu()
    setCompletedTasks(prevTasks => [tasks.find(task => task == taskToCheck), ...prevTasks])
    setTasks(prevTasks => prevTasks.filter(task => task != taskToCheck))
  }

  const onUncheckTask = (taskToUncheck) => {
    closeContextMenu()
    setTasks(prevTasks => [...prevTasks, completedTasks.find(task => task == taskToUncheck)])
    setCompletedTasks(prevTasks => prevTasks.filter(task => task != taskToUncheck))
  }

  const onRemoveTask = () => {
    closeContextMenu()

    if (tasks.includes(taskMenuData.task)) {
      setTasks(prevTasks => prevTasks.filter(task => task != taskMenuData.task))
    }
    else if (completedTasks.includes(taskMenuData.task)) {
      setCompletedTasks(prevTasks => prevTasks.filter(task => task != taskMenuData.task))
    }
  }

  const closeContextMenu = () => {
    if (taskMenuData.show) {
      setTaskMenuData({...taskMenuData, show: false})
    }
  }

  const onEditTask = () => {

  }

  const taskMenuItems = [
    {
        name: "Rename",
        icon: <AiFillEdit className='' />,
        func: () =>  console.log("rename task")
    },
    {
        name: "Remove",
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
            <Heading subtext={`${tasks.length} pending tasks left`} >{moment().format('dddd')}</Heading>
          </Col>
        </Row>

        {/* Need an extra container here wrapped around the button and task list to position btn */}
        <Row className='app-main-content d-flex justify-content-center'>
          <Col xs={11} lg={10} xl={6} className='task-container'>

            {/* Tasks go here */}
            <Row className='task-list'>
              <Col>
                {tasks.map((task, taskIndex) => (
                  <Task onCheckTask={onCheckTask} onExpandMenu={setTaskMenuData} key={`task-${taskIndex}`} task={task} taskIndex={taskIndex} />
                ))}
                {completedTasks.map((task, taskIndex) => (
                  <Task completed onCheckTask={onUncheckTask} onExpandMenu={setTaskMenuData} key={`completed-task-${taskIndex}`} task={task} taskIndex={taskIndex} />
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
