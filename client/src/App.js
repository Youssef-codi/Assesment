import { useState, useEffect } from "react";
const API_BASE = "http://localhost:5000";
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your React app's domain
  optionsSuccessStatus: 200 
}

// app.use(cors(corsOptions));


function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("")

   useEffect(() => {
    GetTodos();
    console.log(todos);
   }, [])
   
   const GetTodos = () => {
    fetch(API_BASE + "/todos")
    .then(res => res.json())
    .then(data => setTodos(data))
    .catch(err => console.error("Error: ", err));
  }


  const completeTodo = async id => {
    const data = await fetch(API_BASE + "/todos/complete/" + id)
    .then( res => res.json());

    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
          todo.complete = data.complete;
      }

      return todos;
    }));

  }
  const deleteTodo = async id => {
    const data = await fetch(API_BASE + "/todos/delete/" + id, {   method: "DELETE"
  }).then( res => res.json());
    setTodos(todos => todos.filter(todos => todos._id !== data._id))
  }

  const addTodo = async () => {
    const data = await fetch(API_BASE + "/todos", {
      method:"POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        text: newTodo
      })
    } ).then(res => res.json());

    setTodos([...todos, data]);
    setPopupActive(false);
    setNewTodo("");
  }
  return (
    <div className="App">
      <h1>To do list</h1>
      <h4>Your Tasks</h4>

      <div className="todos">
        {todos.map(todos => (
                <div className={
                "todos " + (todos.complete ? "is-complete" : "") }
                 key={todos._id} onClick={() => completeTodo(todos._id)}>
                <div className="checkbox"></div> 
                <div className="text">{ todos.text }</div>
                <div className="delete-todos" onClick={() => deleteTodo
                   (todos._id)}>x</div>
        </div>
        ))}
         


         
        </div>
        <div className="addPopup" onClick={() => setPopupActive(true )}>+</div>
        {popupActive ? (
          <div className="popup">
            <div className="closePopup" onClick={() => setPopupActive(false )}>x</div>
            <div className="content">
              <h3>Add Task</h3>
              <input type="text"
               className="add-to-do-input" 
               onChange={e => setNewTodo(e.target.value)}
               value={newTodo}/>
               <div className="button" onClick={addTodo}>Create Task</div>
            </div>
          </div>
        ) : ''}
      </div>
  );
}

export default App;
