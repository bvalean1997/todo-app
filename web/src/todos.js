import axios from 'axios';

export const listTodos = async () => {
    const result = await axios.get('http://localhost:8080/todos');
    return result.data;
};

export const createTodo = (title, isCompleted) =>
  axios.post("http://localhost:8080/todos", {
    title,
    isCompleted,
  });

export const updateTodo = (id, isCompleted) =>
    axios.put(`http://localhost:8080/todos/${id}`, { isCompleted });

export const deleteTodo = (id) =>
    axios.delete(`http://localhost:8080/todos/${id}`);