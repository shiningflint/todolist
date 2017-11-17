import React, { Component } from 'react';
import buttonPic from '../images/button.svg';
import upBtn from '../images/up_arrow.svg';
import buttonGreen from '../images/button_green.svg';
import buttonRemove from '../images/button_close.svg';
import PropTypes from 'prop-types';
import firebase from 'firebase';
firebase.initializeApp({
  apiKey: "AIzaSyCUtF_WXn5avNg1IDSTOMofbn29QBwMU_Y",
  authDomain: "web-test-project-3049e.firebaseapp.com",
  databaseURL: "https://web-test-project-3049e.firebaseio.com",
  projectId: "web-test-project-3049e",
  storageBucket: "web-test-project-3049e.appspot.com",
  messagingSenderId: "620721885462"
});

class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  _onClick(e) {
    this.props.toggleTodo(this.props.todo.id)
  }

  render() {
    let todoState = this.props.todo.active;
    let buttonState = (todoState ? buttonGreen : buttonPic);
    let todoStateClass = (todoState ? "active" : "");
    return(
      <li className="todo-item">
        <span className="todo-check">
          <img
            src={buttonState}
            alt="todo button"
            className="todo-button-img"
            onClick={this._onClick} />
        </span>
        <span className={"todo-text "+todoStateClass}>{this.props.todo.value}</span>
        <span className="todo-remove-span">
          <img src={buttonRemove} alt="todo delete" className="todo-remove-img" />
        </span>
      </li>
    )
  }
}

const TodoList = (props) => (
  <ul className="todo-ul">
    { props.todos.map((todo) => {
      return(
        <TodoListItem
          key={todo.id}
          todo={todo}
          toggleTodo={props.toggleTodo} />
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
        {"id": "string1", "active": false, "value": "eat bananas"},
        {"id": "string2", "active": false, "value": "bake potatoes"},
        {"id": "string3", "active": true, "value": "fry bacon"},
      ],
      todoinput: "",
    }
    this.toggleTodo = this.toggleTodo.bind(this)
  }

  toggleTodo(clicked) {
    let newArray = this.state.todos.map((todo) => {
      if (clicked === todo.id) {
        todo.active = !todo.active
      }
      return todo;
    });
    this.setState({
      todos: newArray,
    });
  }

  render() {
    return(
      <div className="todo-wrap">
        <div className="torn-paper"></div>
        <TodoList todos={this.state.todos} toggleTodo={this.toggleTodo}/>
        <TodoInput />
      </div>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.array,
  toggleTodo: PropTypes.func,
}

TodoListItem.propTypes = {
  todo: PropTypes.object,
  toggleTodo: PropTypes.func,
}

export default Todo;
