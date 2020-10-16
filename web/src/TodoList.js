import React from "react";

const TodoList = (props) => {
    return (<div className="todos">
        {props.filteredTodos.map((todo) => {
            return (
                <label key={todo.id} className='todo'>
                    <input
                        type='checkbox'
                        checked={todo.isCompleted}
                        onChange={(event) => {
                            props.updateTodo(todo.id, event.target.checked);
                        }}
                    />
                    {todo.title}
                    <button onClick={() => props.deleteTodo(todo.id)}>x</button>
                </label>
            );
        })}
    </div>
    );
};

export default TodoList;