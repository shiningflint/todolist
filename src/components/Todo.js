import React, { Component } from 'react';
import buttonPic from '../images/button.svg';
import upBtn from '../images/up_arrow.svg';
import buttonGreen from '../images/button_green.svg';
import buttonRemove from '../images/button_close.svg';

const TodoList = (props) => (
  <ul className="todo-ul">
    { props.todos.map((todo, index) => {
      return(
        <li key={index}
          className="todo-item">
          <span className="todo-check">
            <img src={buttonGreen} alt="todo button" className="todo-button-img" />
          </span>
          <span className="todo-text">{todo}</span>
          <span className="todo-remove-span">
            <img src={buttonRemove} alt="todo delete" className="todo-remove-img" />
          </span>
        </li>
      )
    })}
  </ul>
)

const TodoInput = (props) => (
  <div className="todo-input-wrap">
    <span className="todo-check todo-check--input">
      <img src={upBtn} alt="todo button"
        className="todo-button-img todo-button-img--input" />
    </span>
    <span className="todo-input-span">
      <input
        type="text"
        className="todo-input"
        placeholder="Type a new task..."/>
    </span>
  </div>
)

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        "eat bananas", "bake potatoes", "fry bacon",
        "eat bananas", "bake potatoes", "fry bacon",
        "バナナを食べる", "ポテトをフライする", "選択？分からない",
      ],
      todoinput: "",
    }
  }

  render() {
    return(
      <div className="todo-wrap">
        <TodoList todos={this.state.todos}/>
        <TodoInput />
      </div>
    )
  }
}

export default Todo;
