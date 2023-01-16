import Task from './Task';

const onCheck = () => {
    console.log("check test")
}
const onExpandMenu = () => {
    console.log("expand test")
}

const defaultTask = {
    description: "Do a task",
    completed: false
}

export default {
    title: 'Task',
    component: Task,
    args: {
        onCheckTask: onCheck,
        onExpandMenu: onExpandMenu,
        task: {
            ...defaultTask
        }
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

    },
};