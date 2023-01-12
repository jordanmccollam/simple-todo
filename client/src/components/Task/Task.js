import {Row, Col} from 'react-bootstrap';
import './task.scss';
import Checkbox from '../Checkbox/Checkbox';
import {BsCheck2All} from 'react-icons/bs';

const Task = (props) => {

    const expandOptions = (e) => {
        e.preventDefault(); // disables default context menu
        props.onExpandMenu(prevData => ({
            x: e.pageX,
            y: e.pageY,
            show: props.task == prevData.task ? !prevData.show : true,
            task: props.task
        }))
    }

    return (
        <Row 
            className={`task ${props.completed ? 'task-completed' : ''}`} 
            onClick={() => props.onCheckTask(props.task)} 
            onContextMenu={(e) => {
                expandOptions(e);
            }
        }>
            <Col xs={1} className='text-center'>
                {/* Checkbox here */}
                <Checkbox checked={props.completed} />
            </Col>
            <Col>
                {/* task here here */}
                {props.task}
            </Col>
        </Row>
    )
}

export default Task;