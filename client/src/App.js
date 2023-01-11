import { Container, Row, Col } from 'react-bootstrap';
import { Heading, Task } from './components';
// import './app.scss';

function App() {
  return (
    <div className='App'>
      
      <Container>
        <Row>
          <Col>
            <Heading subtext={`9 pending tasks left`} >MY DAY</Heading>
          </Col>
        </Row>

        <Row className='d-flex justify-content-center'>
          <Col xs={11} lg={10} xl={6}>
            {/* Tasks go here */}
            <Task task="Do a task" />
            <Task task="Do a task" />
            <Task task="Do a task" />

          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default App;
