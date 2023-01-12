import {Row, Col} from 'react-bootstrap';
import './task.scss';
import Checkbox from '../Checkbox/Checkbox';

const Task = (props) => {
    return (
        <Row className={`task ${props.isEmpty ? 'task-empty' : ''} ${props.completed ? 'task-completed' : ''}`} onClick={() => props.onCheckTask(props.task)}>
            {!props.isEmpty && (
            <>
                <Col xs={1} className='text-center'>
                    {/* Checkbox here */}
                    <Checkbox checked={props.completed} />
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