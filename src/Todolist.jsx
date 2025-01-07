import { useReducer } from "react"
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import {FaPlus} from "react-icons/fa";



function reducer(state, action) {
  switch (action.type) {
    case "inputTask":
      return { ...state, task: action.payload };

    case "addTask":
      if (!state.task.trim()) {
        alert("Please enter the task")
        return state
      }

      if (state.isEditing) {
        return {
          ...state,
          tasks: state.tasks.map((item) => item.id === state.isToEdit ? { ...item, taskToDo: state.task } : item),
          task: "",
          isEditing: false
        };
      }
      return {
        ...state,
        tasks: [...state.tasks, { id: Date.now(), taskToDo: state.task }],
        task: ""
      }

    case "deleteTask":
      return {
        ...state,
        tasks: state.tasks.filter(item => item.id !== action.payload)
      };

    case "editTask":
      return {
        ...state,
        isEditing: true,
        isToEdit: action.payload.id,
        task: action.payload.taskToDo
      };
  }
}


const initialstate = {
  task: "",
  tasks: [],
  isToEdit: null,
  isEditing: false,
}
function ToDoList() {
  const [state, dispatch] = useReducer(reducer, initialstate)

  return (
    <>
      <form action="" onSubmit={(e) => {
        e.preventDefault()
        dispatch({ type: "addTask" })
      }}>
        <input type="text" placeholder="Enter Task" value={state.task} onChange={(e) => dispatch({ type: "inputTask", payload: e.target.value })} />
        <button type="Submit">{(state.isEditing) ? (<><MdEdit/>Edit Task</>):(<><FaPlus/>Add Task</>)}</button>
      </form>
      <ul>
        {
          state.tasks.map((task) => (
        <li key={task.id}>{task.taskToDo}
<MdDelete onClick={()=>dispatch({type:"deleteTask" ,payload:task.id})}/>
  <MdEdit onClick={()=>dispatch({type:"editTask" ,payload:task})}/>
</li>
          ))
        }
      </ul>
    </>
  )
}

export default ToDoList
