import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import MovieList from './components/MovieList';
import {Switch} from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
          <Route path="/" component={NavigationBar}></Route>
          <Route path="/:section" component={MovieList}></Route>
      </Router>
    </div>
  );
}

export default App;
