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
    this.removeTodo = this.removeTodo.bind(this);
  }

  _onClick() {
    this.props.toggleTodo(this.props.todo)
  }

  removeTodo() {
    this.props.removeTodo(this.props.todo);
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
          <img
            src={buttonRemove}
            alt="todo delete"
            className="todo-remove-img"
            onClick={this.removeTodo} />
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
          toggleTodo={props.toggleTodo}
          removeTodo={props.removeTodo} />
      )
    })}
  </ul>
)

const TodoInput = (props) => (
  <div className="todo-input-wrap">
    <span className="todo-check todo-check--input">
      <img src={upBtn} alt="todo button"
        className="todo-button-img todo-button-img--input"
        onClick={props.updateFirebase} />
    </span>
    <span className="todo-input-span">
      <input
        type="text"
        className="todo-input"
        placeholder="Type a new task..."
        value={props.todoinput}
        onChange={props.updateInput}
        onKeyPress={props.pressEnter} />
    </span>
  </div>
)

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todoinput: "",
    }
    this.toggleTodo = this.toggleTodo.bind(this);
    this.gotData = this.gotData.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.pressEnter = this.pressEnter.bind(this);
    this.updateFirebase = this.updateFirebase.bind(this);
  }

  componentDidMount() {
    const todoDB = firebase.database();
    const todoRef = todoDB.ref('todos');
    todoRef.on("value", this.gotData, this.errData);
  }

  gotData(data) {
    const listTodos = data.val();
    let newArray = [];
    for(const key in listTodos) {
      let dataObject = {
        "id": key,
        "active": listTodos[key].active,
        "value": listTodos[key].value,
      }
      newArray.push(dataObject);
    }
    this.setState({
      todos: newArray,
    });
  }

  errData(err) {
    console.log("Error!");
    console.log(err);
  }

  toggleTodo(todoItem) {
    firebase.database().ref('/todos/'+todoItem.id+"/active")
      .set(!todoItem.active)
  }

  updateInput(e) {
    this.setState({
      todoinput: e.target.value,
    });
  }

  updateFirebase() {
    if (this.state.todoinput !== "") {
      const newData = {
        active: false,
        value: this.state.todoinput,
      };
      const theDB = firebase.database().ref('todos');
      theDB.push(newData);
      this.setState({
        todoinput: "",
      });
    }
  }

  removeTodo(todoItem) {
    firebase.database().ref('/todos/'+todoItem.id).remove()
  }

  pressEnter(e) {
    const keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      this.updateFirebase()
    }
  }

  render() {
    return(
      <div className="todo-wrap">
        <div className="torn-paper"></div>
        <TodoList
          todos={this.state.todos}
          toggleTodo={this.toggleTodo}
          removeTodo={this.removeTodo} />
        <TodoInput
          todoinput={this.state.todoinput}
          updateInput={this.updateInput}
          updateFirebase={this.updateFirebase}
          pressEnter={this.pressEnter} />
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

TodoInput.propTypes = {
  todoinput: PropTypes.string,
}

export default Todo;
