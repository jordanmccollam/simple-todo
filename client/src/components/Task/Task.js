import { useState } from 'react';
import './task.scss';
import { BsCheck2All } from 'react-icons/bs';
import { AiFillCheckCircle, AiFillEdit } from 'react-icons/ai'

const Task = ({
    task, // -> description, id, completed
    onCheckTask,
    onExpandMenu,
    editing,
    onConfirmEdit
}) => {
    const [ description, setDescription ] = useState(task.description)
    // const [ editing, setEditing ] = useState(false)

    const expandOptions = (e) => {
        e.preventDefault(); // disables default context menu

        onExpandMenu(prevData => ({
            x: e.pageX,
            y: e.pageY,
            show: task === prevData.task ? !prevData.show : true,
            task: task
        }))
    }

    const onChange = (e) => {
        setDescription(e.target.value)
    }

    const onBlur = () => {
        onConfirmEdit()
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

    return (
        <div 
            className={`task ${task.completed ? 'task-completed' : ''}`} 
            onClick={() => !editing && onCheckTask(task)} 
            onContextMenu={(e) => {
                expandOptions(e);
            }
        }>

            {renderIcon()}

            <div>
                {/* task here */}
                {!editing ? (
                    description
                ) : (
                    <div>
                        <input 
                            type='text'
                            placeholder='Task description here'
                            value={description}
                            onChange={onChange}
                            onBlur={onBlur}
                            onKeyDown={handleEnterKeyPress}
                            autoFocus
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Task;