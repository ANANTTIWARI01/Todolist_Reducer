import { useReducer } from "react"
import {MdDelete} from "react-icons/md";
import {MdEdit} from "react-icons/md";



function reducer(state, action){
    switch(action.type){
        case "inputTask":
            return {...state, task: action.payload};

        case "addTask":
            return {
                ...state , tasks: [...state.tasks, {id: Date.now(), taskToDo: state.task}],
                task:""
            };
                                                                          
            case "deleteTask":
                return {
                    ...state,
                    tasks:state.tasks.filter(item=>item.id!==action.payload)
                }
    }
}


function handleDelete(ID){
}

const initialstate = {
    task: "" , 
    tasks: [] , 
}
function ToDoList() {
    const [state, dispatch] = useReducer(reducer, initialstate)

  return (
    <>
   <form action="" onSubmit={(e)=>{
     e.preventDefault()
     dispatch({ type: "addTask"})
   }}>
    <input type="text"  placeholder="Enter Task" value={state.task} onChange={(e)=> dispatch({ type: "inputTask" , payload: e.target.value })}/>
    <button type="Submit">ADD TASK</button>
   </form>
   <ul>
    {
      state.tasks.map((task)=>(
        <li key={task.id}>{task.taskToDo}</li>
<MdDelete onClick={()=>dispatch({type:"deleteTask" ,payload:task.id})}/>
      ))
    }
   </ul>
   </>
  )
}

export default ToDoList
