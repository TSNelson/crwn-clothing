import React from 'react';
import './App.css';
// react-router-dom enables routing behaviors in a react SPA
// named component renders for matching path
import { Switch, Route } from 'react-router-dom';

// Components
import HomePage from './pages/homepage/homepage';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
