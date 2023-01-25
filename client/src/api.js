import axios from 'axios';

console.log("Api enviornment: " + process.env.REACT_APP_ENV); // <- for testing

const rest = process.env.REACT_APP_ENV === 'production' ? axios : axios.create({
    baseURL: 'http://localhost:8000/api'
})

// TASKS
export const getTasks = () => rest.get(`/tasks`).catch(err => console.error("request", err));
export const createTask = (payload) => rest.post(`/task`, payload).catch(err => console.error("request", err));


const apis = {
    getTasks,
    createTask
}

export default apis;