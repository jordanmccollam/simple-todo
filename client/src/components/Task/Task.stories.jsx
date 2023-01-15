import Task from './Task';

const onCheck = () => {
    console.log("check test")
}
const onExpandMenu = () => {
    console.log("expand test")
}

export default {
    title: 'Task',
    component: Task,
    args: {
        task: "Do a task",
        onCheckTask: onCheck,
        onExpandMenu: onExpandMenu,
    }
}

const Template = args => <Task {...args} />

export const Default = {
    args: {
        completed: false
    },
};

export const Completed = {
    args: {
        completed: true
    },
};