import React from "react";
import "./taskForm.css";
import { useReducer } from "react";

const initialState = {
  task: "",
  taskList: [],
};
function reducer(state, action) {
  switch (action.type) {
    case "SET_TASK": return { ...state, task: action.value };
    case "ADD":
      if (state.task.trim() !== "") {
        return {
          ...state,
          taskList: [...state.taskList, state.task],
          task: "",
        }
      }
      return state;
    case "DELETE":
      return {
        ...state,
        taskList: state.taskList.filter((_, index) => index !== action.index),
      };
    default:
      return state;
  }
}

const TaskForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const items = state.taskList.map((item, i) => {
    return (
      <div className="task">
        <p className="index"> {i + 1}:  </p>
        <li className="task__item" key={i}>{item}</li>
        <button
          onClick={() => dispatch({ type: "DELETE", index: i })}
        >Delete</button>
      </div>

    )
  })

  return (
    <div className="task_form">
      <input
        type="text"
        placeholder="Enter task name"
        value={state.task}
        onChange={(e) => dispatch({ type: "SET_TASK", value: e.target.value })}
      />

      <button
        onClick={() => dispatch({ type: "ADD" })}
      >Add task</button>

      <div className="tasks">
        <ul className="task_list">{items}</ul>
      </div>
    </div>

  )
}

export default TaskForm