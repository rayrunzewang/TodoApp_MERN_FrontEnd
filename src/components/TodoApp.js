import { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom"; // 导入 useNavigate

const API_BASE = "http://localhost:3001";

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [popupActive, setPopupActive] = useState(false);
    const [newTodo, setNewTodo] = useState("")
    const { setUser } = useUser();
    const navigate = useNavigate(); // 使用 useNavigate 钩子

    useEffect(() => {
        GetTodos();
    }, [])

    const GetTodos = () => {
        fetch(API_BASE + "/todos", { credentials: 'include' })
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error("Error: ", err),)
    }

    const completeTodo = async id => {
        const data = await fetch(API_BASE + "/todo/complete/" + id, { credentials: 'include' })
            .then(res => res.json());

        setTodos(todos => todos.map(todo => {
            if (todo._id === data._id) {
                todo.complete = data.complete;
            }

            return todo;
        }))
    }

    const deleteTodo = async id => {
        try {
            const response = await fetch(API_BASE + "/todo/delete/" + id, {
                method: "DELETE",
                credentials: 'include'
            })

            if (!response.ok) {
                throw new Error("Failed to delete todo");
            }

            setTodos(todos => todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error("Delete todo error:", error);
            // 在这里处理错误，例如显示错误消息给用户或采取其他适当的措施
        }
    }

    const addTodo = async () => {
        const data = await fetch(API_BASE + "/todo/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: newTodo
            })
        }).then(res => res.json());

        setTodos([...todos, data]);
        setPopupActive(false);
        setNewTodo("");
    }

    const handleLogout = () => {
        setUser(null);

        // Clear login status
        localStorage.removeItem("loginStatus");

        // Navigate back to the login page
        navigate("/login");
        fetch(API_BASE + "/logout", { method: 'POST', credentials: 'include' })
            .then(response => {
                if (response.ok) {
                    console.log('Logout Successfully');
                } else {
                    console.error('Logout failed');
                }

            })
            .catch(error => {
                console.error('Error during logout:', error);
            });
    };

    return (
        <div className="App">
            <h1>TO-DO LIST</h1>
            <h4>practice is the best teacher</h4>

            <div className="todos">
                {todos.map(todo => (
                    <div className={
                        "todo " + (todo.complete ? "is-complete" : "")
                    } key={todo._id} onClick={() => completeTodo(todo._id)}>
                        <div className="checkbox"></div>

                        <div className="text">{todo.text}</div>

                        <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>&times;</div>
                    </div>
                ))}
            </div>

            <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

            {popupActive ? (
                <div className="popup">
                    <div className="closePopup" onClick={() => setPopupActive(false)}>&times;</div>
                    <div className="content">
                        <h3>NEW TASK</h3>
                        <input
                            type="text"
                            className="add-todo-input"
                            onChange={e => setNewTodo(e.target.value)}
                            value={newTodo} />
                        <div className="button" onClick={addTodo}>ADD</div>
                    </div>
                </div>
            ) : ''}

            <button className="logout" onClick={handleLogout}>LOGOUT</button>
        </div>
    );
}

export default TodoApp;