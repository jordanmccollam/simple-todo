import { Row, Col } from 'react-bootstrap';
import './task.scss';
import { BsCheck2All } from 'react-icons/bs';
import { AiFillCheckCircle } from 'react-icons/ai'

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
        <div 
            className={`task ${props.completed ? 'task-completed' : ''}`} 
            onClick={() => props.onCheckTask(props.task)} 
            onContextMenu={(e) => {
                expandOptions(e);
            }
        }>
            {/* Checkbox here */}
            {props.completed ? (
                <BsCheck2All className={`checkbox-icon`} />
            ) : (
                <AiFillCheckCircle className={`checkbox-icon`} />
            )}
            <div>
                {/* task here here */}
                {props.task}
            </div>
        </div>
    )
}

export default Task;