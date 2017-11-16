import React, { Component } from 'react';
import buttonPic from '../images/button.svg';

const TodoList = (props) => (
  <ul className="todo-ul">
    { props.todos.map((todo, index) => {
      return(
        <li key={index}
          className="todo-item">
          <span className="todo-check">
            <img src={buttonPic} alt="todo button" className="todo-button-img" />
          </span>
          <span className="todo-text">{todo}</span>
        </li>
      )
    })}
  </ul>
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
    }
  }

  render() {
    return(
      <div className="todo-wrap">
        <TodoList todos={this.state.todos}/>
      </div>
    )
  }
}

export default Todo;
