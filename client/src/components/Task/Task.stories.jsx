import Task from './Task';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { TiCancel } from 'react-icons/ti';

const defaultTask = {
    description: "Do a task",
    completed: false
}

export default {
    title: 'Task',
    component: Task,
    args: {
        onCheckTask: () => console.log("toggle check!"),
        onConfirmEdit: () => console.log("confirm edit"),
        task: {
            ...defaultTask
        },
        taskMenuItems: [
            {
                name: 'Rename',
                icon: <AiFillEdit className='' />,
                func: () => console.log("rename task")
            },
            {
                name: 'Remove',
                icon: <AiFillDelete className='' />,
                func: () => console.log("remove task")
            },
            {
                name: "Cancel",
                icon: <TiCancel className='' />,
                func: () => console.log("cancel")
            },
        ]
    }
}

const Template = args => <Task {...args} />

export const Default = {
    args: {
        
    },
};

export const Completed = {
    args: {
        task: {...defaultTask, completed: true}
    },
};

export const InEditing = {
    args: {
        editing: true
    },
};