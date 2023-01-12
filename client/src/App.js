import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Heading, Task } from './components';
// import './app.scss';

const testTasks = [
  {
    task: "Do a task"
  },
  {
    task: "Do dishes"
  },
  {
    task: "Make bed"
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

  const onAddTask = (event) => {
    var newTask = {task: "NEW TASK"}
    setTasks(oldTasks => [...oldTasks, newTask]);
  }

  const onCheckTask = (taskToCheck) => {
    setCompletedTasks(oldTasks => [tasks.find(t => t.task == taskToCheck), ...oldTasks])
    setTasks(oldTasks => oldTasks.filter(task => task.task != taskToCheck))
  }

  const onUncheckTask = (taskToUncheck) => {
    setTasks(oldTasks => [...oldTasks, completedTasks.find(t => t.task == taskToUncheck)])
    setCompletedTasks(oldTasks => oldTasks.filter(task => task.task != taskToUncheck))
  }

  return (
    <div className='App'>
      
      <Container className='app-container'>
        <Row className='app-header'>
          <Col>
            <Heading subtext={`9 pending tasks left`} >MY DAY</Heading>
          </Col>
        </Row>

        {/* Need an extra container here wrapped around the button and task list to position btn */}
        <Row className='app-main-content d-flex justify-content-center'>
          <Col xs={11} lg={10} xl={6} className='task-container'>

            {/* Tasks go here */}
            <Row className='task-list'>
              <Col>
                {tasks.map((task, taskIndex) => (
                  <Task onCheckTask={onCheckTask} key={`task-${taskIndex}`} task={task.task} taskIndex={taskIndex} />
                ))}
                {completedTasks.map((task, taskIndex) => (
                  <Task completed onCheckTask={onUncheckTask} key={`task-${taskIndex}`} task={task.task} taskIndex={taskIndex} />
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
