import React, { Component } from 'react';
import buttonPic from '../images/button.svg';
import upBtn from '../images/up_arrow.svg';
import buttonGreen from '../images/button_green.svg';
import buttonRemove from '../images/button_close.svg';
import PropTypes from 'prop-types';

class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  _onClick(e) {
    this.props.toggleTodo(this.props.index)
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
    { props.todos.map((todo, index) => {
      return(
        <TodoListItem
          key={index}
          index={index}
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
        {"active": false, "value": "eat bananas"},
        {"active": false, "value": "bake potatoes"},
        {"active": true, "value": "fry bacon"},
      ],
      todoinput: "",
    }
    this.toggleTodo = this.toggleTodo.bind(this)
  }

  toggleTodo(clicked) {
    let newArray = this.state.todos.map((todo, index) => {
      if (clicked === index) {
        todo.active = !this.state.todos[index].active
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
  index: PropTypes.number,
  todo: PropTypes.object,
  toggleTodo: PropTypes.func,
}

export default Todo;
