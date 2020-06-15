import React from 'react';
import './App.css';
import Main from './Components/main';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductsList from './Components/ProductsList/ProductsList';

function App() {
  return (
    <div>
      <Router >
        <Route exact path="/main" Component={Main} />
        <Route exact path="/productList" Component={ProductsList} />
      </Router>
      <Main />
    </div>
  );
}

export default App;
