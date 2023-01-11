import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Heading, Task } from './components';
// import './app.scss';

const test_tasks = [
  {
    task: "Do a task"
  },
  {
    task: "Do dishes"
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
  // {
  //   task: "Make bed"
  // },
]

function App() {
  const [tasks, setTasks] = useState(test_tasks)

  return (
    <div className='App'>
      
      <Container className='app-container'>
        <Row className='app-header'>
          <Col>
            <Heading subtext={`9 pending tasks left`} >MY DAY</Heading>
          </Col>
        </Row>

        <Row className='app-main-content d-flex justify-content-center'>
          <Col xs={11} lg={10} xl={6} className='task-list'>
            {/* Tasks go here */}
            {tasks.map((task, task_index) => (
              <Task key={`task-${task_index}`} task={task.task} />
            ))}
            
            <Button variant='danger' className='rounded-circle add-task-btn shadow' >+</Button>
          </Col>
        </Row>

      </Container>
    </div>
  );
}

export default App;
