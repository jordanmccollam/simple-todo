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

  const onAddTask = (event) => {
    const newTask = {task: "NEW TASK"}
    setTasks(oldTasks => [...oldTasks, newTask]);
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
                  <Task key={`task-${taskIndex}`} task={task.task} />
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
