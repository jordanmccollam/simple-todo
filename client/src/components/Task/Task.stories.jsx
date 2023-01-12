import Task from './Task';

export default {
    title: 'Task',
    component: Task
}

const Template = args => <Task {...args} />

const onCheck = () => {
    console.log("check test")
}
const onExpandMenu = () => {
    console.log("expand test")
}

export const Default = {
    args: {
        task: "Do a task",
        onCheckTask: onCheck,
        onExpandMenu: onExpandMenu,
    },
};

export const Completed = {
    args: {
        task: "Do a task",
        onCheckTask: onCheck,
        onExpandMenu: onExpandMenu,
        completed: true
    },
};

export const Empty = {
    args: {
        task: "Do a task",
        isEmpty: true,
        onCheckTask: onCheck,
        onExpandMenu: onExpandMenu,
    },
};