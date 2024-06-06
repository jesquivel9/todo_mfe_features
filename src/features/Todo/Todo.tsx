import { useEffect, useState } from "react";
import { TodoItem } from "./types";

const Todo = () => {

    const LOCAL_STORE_TODO: string = 'todo';
    const TODO_ALL = 0;
    const TODO_ACTIVE = 1;
    const TODO_COMPLETED = 2;

    const [todo, setTodo] = useState<TodoItem[]>([]);
    const [showTodo, setShowTodo] = useState(TODO_ALL);
    const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const localStoreTodo = JSON.parse(localStorage.getItem(LOCAL_STORE_TODO) || '""');
    if (localStoreTodo) {
      setTodo(localStoreTodo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORE_TODO, JSON.stringify(todo));
  }, [todo, showTodo]);

    const inputHandler = (e) => { 
        setNewTodo(e.target.value) 
    };

    const addTodo = () => {
        const todoItem: TodoItem = {
            id: Date.now(),
            task: newTodo,
            done: false,
        }
        setTodo([...todo, todoItem]);
        setNewTodo("");
    };

    const isCompleted = (id: number) => {
        const list = todo.map(item => {
            return {
                ...item,
                done: item.id === id ? !item.done : item.done,
            }
        });
        setTodo(list);
        console.log('is done', id);

    };

    const showList = () => {

        if (showTodo === TODO_ALL) {

            return todo.map(item => {
                return (
                    <li key={item.id}>
                        <input type="checkbox" checked={item.done} onChange={() => isCompleted(item.id)}/>
                        {item.done ? <s>item.task</s> : item.task}
                    </li>
                );
            });

        } else if (showTodo === TODO_COMPLETED) {

            return todo.filter(item => item.done).map(item => {
                return (
                    <li key={item.id}>
                        <input type="checkbox" checked={item.done} onChange={() => isCompleted(item.id)}/>
                        {item.done ? <s>item.task</s> : item.task}
                    </li>
                );
            });

        } else if (showTodo === TODO_ACTIVE) {

            return todo.filter(item => !item.done).map(item => {
                return (
                    <li key={item.id}>
                        <input type="checkbox" checked={item.done} onChange={() => isCompleted(item.id)}/>
                        {item.done ? <s>item.task</s> : item.task}
                    </li>
                );
            });

        }
    };

    return (
        <>
            <h1>Todo List ({todo.length})</h1>
            <button onClick={() => setShowTodo(TODO_ALL)}>All</button>
            <button onClick={() => setShowTodo(TODO_ACTIVE)}>Active</button>
            <button onClick={() => setShowTodo(TODO_COMPLETED)}>Completed</button>
            <br />
            <br />
            <input type="text" value={newTodo} onChange={inputHandler} />
            <button onClick={addTodo}>Add</button>
            <br />
            <ol>{showList()}</ol>
        </>
    );
};

export default Todo;
