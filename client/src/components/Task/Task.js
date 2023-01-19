import { useState } from 'react';
import { BsCheck2All } from 'react-icons/bs';
import { AiFillCheckCircle, AiFillEdit } from 'react-icons/ai'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import './task.scss';

const Task = ({
    task, // -> description, id, completed
    onCheckTask,
    editing,
    onConfirmEdit,
    taskMenuItems // -> name, icon, func
}) => {
    const [ description, setDescription ] = useState(task.description)
    // const [ editing, setEditing ] = useState(true)

    const onChange = (e) => {
        setDescription(e.target.value)
    }

    const onBlur = () => {
        onConfirmEdit({...task, description: description})
    }

    const handleEnterKeyPress = (e) => {
        if (e.keyCode === 13 || e.keyCode === 27) { // enter or esc
            e.target.blur()
        }
    }

    const renderIcon = () => {
        if (editing) {
            return <AiFillEdit className={`checkbox-icon`} />
        } else {
            if (task.completed) {
                return <BsCheck2All className={`checkbox-icon`} />
            } else {
                return <AiFillCheckCircle className={`checkbox-icon`} />
            }
        }
    }

    const onClick = (e, func) => {
        e.preventDefault()
        func(task)
    }

    return (
        <Dropdown 
            as={ButtonGroup} 
            className={`task ${task.completed ? 'task-completed' : ''}`}
        >
            <Button 
                className='task-btn text-start'
                onClick={() => !editing && onCheckTask(task)} 
            >
                {renderIcon()} 

                

                {!editing && task.description}

                <input 
                    type='text'
                    placeholder='Task description here'
                    value={description}
                    onChange={onChange}
                    onBlur={onBlur}
                    onKeyDown={handleEnterKeyPress}
                    className={!editing ? 'd-none' : ''}
                    autoFocus
                />
                
            </Button>
    
            <Dropdown.Toggle split className="task-dropdown-toggle" />
            <Dropdown.Menu className='task-dropdown'>
                {taskMenuItems.map((item, i) => (
                    <Dropdown.Item 
                        key={`task-${task.id}-menu-item-${i}`} 
                        href="#"
                        onClick={e => onClick(e, item.func)}
                        className='task-dropdown-item'
                    >
                            {item.name} {` `} {item.icon}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Task;