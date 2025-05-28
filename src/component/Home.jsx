import axios from "axios";
import React, { useState, useEffect } from "react";

const Home = () => {
  const url = "https://6836b885664e72d28e41d28e.mockapi.io/api/char";

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(url).then((res) => {
      setTasks(res.data);
    });
  }, []);

  const addFunction = () => {
    if (newTask.trim() === "") return;

    axios.post(url, { name: newTask }).then((res) => {
      setTasks([...tasks, res.data]);
      setNewTask("");
    });
  };

  const deleteTask = (id) => {
    axios.delete(`${url}/${id}`).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  const filteredTasks = tasks.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">Task List</h1>


      <div className="w-100 max-w-xl bg-violet-100 p-6 rounded shadow mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded "
          />
          <button
            onClick={addFunction}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded w-full sm:w-auto"
          >
            Add
          </button>
        </div>
      </div>


      <div className="w-full flex flex-col justify-center items-center max-w-xl mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className=" px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
        />
      </div>


      <div className="w-full max-w-6xl">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white mb-1 shadow rounded p-4 flex justify-between items-center "
          >
            <li className="text-gray-800">{task.name}</li>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>


      {/* {filteredTasks.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No tasks found.</p>
      )} */}
    </div>
  );
};

export default Home;