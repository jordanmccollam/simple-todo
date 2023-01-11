import {Row, Col} from 'react-bootstrap';
import './task.scss';

const Task = (props) => {
    return (
        <Row className={`task ${props.isEmpty ? 'task-empty' : ''}`}>
            {!props.isEmpty && (
            <>
                <Col xs={1} className='text-center'>
                    {/* Checkbox here */}
                    x
                </Col>
                <Col>
                    {/* task here here */}
                    {props.task}
                </Col>
            </>
            )}
        </Row>
    )
}

export default Task;