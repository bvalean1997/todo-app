const knex = require("knex")({
    client: "mysql",    
    connection: {
        host: "localhost",
        user: "developer",
        password: "Bianca1$",
        database: "todos"
    }
});

const createTodo = (title, isCompleted) => 
    knex('todos').insert({ title, isCompleted });

const toggleTodo = (id, isCompleted) => 
    knex('todos')
        .where('id', '=', id)
        .update({ isCompleted });

const deleteTodo = id => 
    knex('todos')
    .where('id', '=', id )
    .del();

const listTodos = () =>
    knex.select("id", "title", "isCompleted")
        .from("todos");

 
const run = async () => { 
    await createTodo("Create your first todo");
    await createTodo("Create your second todo");
    await createTodo("Create your third todo");
    await toggleTodo(2, 1);
    await deleteTodo(3);
    const todos = await listTodos();
    console.log("todos:", todos);
};
run();