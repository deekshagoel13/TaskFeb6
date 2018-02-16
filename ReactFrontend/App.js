import React, { Component } from 'react';
import List from './components/list';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div>
                <List/>
          </div>
      </div>
    );
  }
}

export default App;
