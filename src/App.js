import React, { Component } from 'react';
import Header from './components/Header';
import Todo from './components/Todo';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <Todo/>
      </div>
    );
  }
}

export default App;
