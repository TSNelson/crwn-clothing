import React from 'react';
import './App.css';
// react-router-dom enables routing behaviors in a react SPA
// named component renders for matching path
import { Switch, Route } from 'react-router-dom';

// Components
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
