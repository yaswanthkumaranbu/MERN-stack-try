import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([{ text: "No Task" }]);
  const [isUpdate,setIsUpdate]=useState(false);
  const [id,setid]=useState(0);
  // const uri = "https://mern-yash.onrender.com"
  const AddTask = async () => {
    await axios
      .post(BACK_END+"/tasks/post", { text: task })
      .then((req, res) => {
        alert("Task added");
        setTask("");
    ShowTask()

      })
      .catch((error) => {
        console.error(error);
      });
  };
 
  const ShowTask = async () => {
    try {
      const x = await axios.get(BACK_END+"/tasks/get");

      setTaskList(x.data);
      console.log("Fetched");
      // return
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    
    ShowTask();
  }, []);

  const GetTask = async (id) => {
    try {
      const x = await axios.get(BACK_END+"/tasks/get/"+id);
      setIsUpdate(true)
      setid(id);

setTask(x.data.text);    } catch (err) {
      console.error(err);
    }
  };

  const DeleteTask = async (id)=>{
   await axios.delete(`${BACK_END}/tasks/delete/${id}`)
    ShowTask()

  }

  const UpdateTask = async (id)=>{
    alert("Updated")
    await axios.put(`${BACK_END}/tasks/put/${id}`,{text:task})
    setIsUpdate(false)

   setTask("");
   ShowTask()

  }

  return (

    <div>
      <h3>To-Do List</h3>
      <input
        type="text"
        placeholder="Enter task"
        onChange={(e) => {
          setTask(e.target.value);
        }}
        value={task}
      />
      <button onClick={isUpdate?()=>UpdateTask(id):AddTask}>{isUpdate? "Update" : "Add" } </button>
      {/* <button onClick={ShowTask}>View</button> */}

      <ol>
        {taskList.map((data, index) => (
          <li style={{listStyle:'none'}} key={index}>
            {`${index+1}.${data.text}`}
            <button onClick={()=>DeleteTask(data._id)}>Delete</button>
            <button onClick={()=>GetTask(data._id)}>Edit</button>
            </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
