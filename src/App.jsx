import { useState, useEffect } from "react";
import "./App.css";
import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
        })) //will return an Array of { id, tood} by iterating over every document present in the present collection....
      );
    });
    return () => unsubscribe();
  }, []);

  const setEdit = (index) => {
    setInput(todos[index].todo);
    setEditIndex(index);
  };

  const addTodo = async () => {
    try {
      if (input.trim() !== "") {
        // setTodos([...todos, { id: new Date(), todo: input }]);
        await addDoc(collection(db, "todos"), { todo: input }); // Because this should be Asynchronous function......
        setInput("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateTodo = async () => {
    try {
      if (input.trim() !== "") {
        // const updatedTodos = [...todos];
        // updatedTodos[editIndex].todo = input;
        // setTodos(updatedTodos);
        const todoDocRef = doc(db, "todos", todos[editIndex].id);
        await updateDoc(todoDocRef, { todo: input });
        setInput("");
        setEditIndex(-1); //Setting -1 again to show (+) sign in Add task....
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeTodo = async (id) => {
    // let filteredTodos = todos.filter((todo) => todo.id !== id);
    // setTodos(filteredTodos);
    try {
      await deleteDoc(doc(db, "todos", id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-custom-background bg-center bg-cover">
      <div className="bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4">
        <h1 className="text-3xl font-bold text-center mb-4">TO-DO APP</h1>
        <div className="flex">
          <input
            type="text"
            placeholder="Add a Task"
            className="py-2 px-4 border rounded w-full focus:outline-none mr-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={editIndex === -1 ? addTodo : updateTodo}
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded"
          >
            {editIndex === -1 ? <FaPlus /> : <FaPencilAlt />}
          </button>
        </div>
      </div>
      {todos.length > 0 && (
        <div className="bg-gray-100 rounded shadow-md w-full max-w-lg lg:w-1/4">
          <ul>
            {/* <li className="flex items-center p-3 bg-white justify-between rounded shadow-md mb-3">
            <span className="text-lg">Learn React</span>
            <div>
              <button className="mr-2 p-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded hover:from-gray-500 hover:to-gray-700">
                <FaPencilAlt />
              </button>
              <button className="mr-2 p-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded hover:from-red-500 hover:to-red-700">
                <FaTrash />
              </button>
            </div>
          </li> */}
            {todos.map((todo, index) => (
              <li
                key={index}
                className="flex items-center p-3 bg-white justify-between rounded shadow-md mb-3"
              >
                <span className="text-lg">{todo.todo}</span>
                <div>
                  <button
                    onClick={(e) => setEdit(index)}
                    className="mr-2 p-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded hover:from-gray-500 hover:to-gray-700"
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="mr-2 p-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded hover:from-red-500 hover:to-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
