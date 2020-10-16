import React, { Component } from 'react';
import Filters from "./Filters";
import TodoList from "./TodoList";
import { listTodos, createTodo, updateTodo, deleteTodo } from './todos';

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            todos: [],
            filter: 'ALL',
        };
    }

    updateTodo = async (id, isCompleted) => {
        await updateTodo(id, isCompleted);
        const todos = await listTodos();
        this.setState({ todos });
    };

    deleteTodo = async (id) => {
        await deleteTodo(id);
        const todos = await listTodos();
        this.setState({ todos });
    };

    setFilterToAll = () => {
        this.setState({ filter: 'ALL' });
    };

    setFilterToCompleted = () => {
        this.setState({ filter: 'COMPLETED' });
    };
    
    setFilterToIncompleted = () => {
        this.setState({ filter: 'INCOMPLETED' });
    };

    filterTodos = (todos, filter) => {
        if (filter === 'ALL') {
            return todos;
        };

        if (filter === 'COMPLETED') {
            return todos.filter((todo) => todo.isCompleted === 1);
        };
        

        if (filter === 'INCOMPLETED') {
            return todos.filter((todo) => todo.isCompleted === 0);
        }
        };

    async componentDidMount() {
        const todos = await listTodos();
        this.setState({ todos });
    }

    onInputChange = (event) => {
        const inputValue = event.target.value;
        this.setState({ inputValue });
    };

    onInputKeyPress = async (event) => {
        if (event.nativeEvent.keyCode === 13) {
            await createTodo(this.state.inputValue, false);
            const todos = await listTodos();
            this.setState({ todos, inputValue: '' });
        }
    };

        render() {
            const filteredTodos = this.filterTodos(this.state.todos, this.state.filter);
            
            return (
                <div className = "container">
                <input
                    className='input'
                    value={this.state.inputValue}
                    onChange={this.onInputChange}
                    onKeyPress={this.onInputKeyPress}
                    />

                    <TodoList
                        filteredTodos={filteredTodos}
                        updateTodo={this.updateTodo}
                        deleteTodo={this.deleteTodo}
                    />

               
                    <Filters
                        setFilterToAll={this.setFilterToAll}
                        setFilterToCompleted={this.setFilterToCompleted}
                        setFilterToIncompleted={this.setFilterToIncompleted}
                    />
        </div>
        );
    }
}

export default TodoApp;