import React, { Fragment, useState } from "react";

function Todo() {
  let [items, setItems] = useState("");
  let [date, setDate] = useState("");
  let [todos, setTodos] = useState([]);
  let [editState, setEditState] = useState(null);

  let handleItemsChange = (event) => {
    setItems(event.target.value);
  };
  let handleDateChange = (event) => {
    setDate(event.target.value);
  };

  let addData = () => {
    if (items !== "" && date !== "") {
      setTodos([...todos, { id: Date.now(), items, date }]);
      setItems("");
      setDate("");
    }
  };

  let editData = (id) => {
    let todoEdit = todos.find((data) => data.id === id);
    if (todoEdit) {
      setItems(todoEdit.items);
      setDate(todoEdit.date);
      setEditState(id);
    }
  };

  let updateData = () => {
    if (items !== "" && date !== "") {
      setTodos(
        todos.map((todo) =>
          todo.id === editState ? { ...todo, items, date } : todo
        )
      );
      setItems("");
      setDate("");
      setEditState(null);
    }
  };

  let deleteData = (id) => {
    console.log(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Fragment>
      <div className="card main-div">
        <h1>Todo App</h1>
        <div className="input-btn">
          <input
            className="text-input"
            type="text"
            placeholder="Enter Todo here"
            onChange={handleItemsChange}
            value={items}
          ></input>
          <input
            className="date-input"
            type="date"
            placeholder="Enter Todo Date"
            onChange={handleDateChange}
            value={date}
          ></input>
          <button
            className="btn btn-primary button"
            onClick={editState ? updateData : addData}
          >
            {editState ? "Update" : "Add"}
          </button>
        </div>
        <ol className="list-group list-group-numbered ol-custom">
          {todos.map((todo) => (
            <li key={todo.id} className="list-group-item result-div-main">
              <div className="Todo-data">{todo.items}</div>
              <div className="date-data">{todo.date}</div>
              <div className="btn-div">
                <button
                  className="btn btn-primary button edit-btn"
                  onClick={() => editData(todo.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-primary button delete-btn"
                  onClick={() => deleteData(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Fragment>
  );
}

export default Todo;
