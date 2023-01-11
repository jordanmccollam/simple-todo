import Task from './Task';

export default {
    title: 'Task',
    component: Task
}

const Template = args => <Task {...args} />

export const Default = {
    args: {
        task: "Do a task"
    },
};