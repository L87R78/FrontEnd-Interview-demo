import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import './App.scss';

import LoginRegister from './components/loginRegister';
import Exam from './components/Exam/exam';
import Home from './components/home';
import Congratulations from './components/Exam/congratulations';
class App extends Component { 

  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/" exact component={LoginRegister}/>
          <Route path="/home" exact component={Home}/>
          <Route path="/exam" exact component={Exam}/>
          <Route path="/congratulations" exact component={Congratulations}/>
        </Switch>
      </div>
    );
  }
}

export default App;