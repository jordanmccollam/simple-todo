import { Container, Row, Col } from 'react-bootstrap';
import { Heading } from './components';
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
      </Container>

    </div>
  );
}

export default App;
