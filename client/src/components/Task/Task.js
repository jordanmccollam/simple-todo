import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './task.scss';
import { BsCheck2All } from 'react-icons/bs';
import { AiFillCheckCircle } from 'react-icons/ai'

const Task = (props) => {
    const [ editing, setEditing ] = useState(true);

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
                {!editing ? (
                    props.task.description
                ) : (
                    <>
                        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                            Your password must be 8-20 characters long, contain letters and numbers,
                            and must not contain spaces, special characters, or emoji.
                        </Form.Text>
                    </>
                )}
            </div>
        </div>
    )
}

export default Task;