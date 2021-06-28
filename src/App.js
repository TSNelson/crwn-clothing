import React from 'react';
import './App.css';
// react-router-dom enables routing behaviors in a react SPA
// named component renders for matching path
import { Switch, Route } from 'react-router-dom';

// Components
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import SignInPage from './pages/sign-in/sign-in';
import Header from './components/header/header';
import { auth } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/sign-in' component={SignInPage} />
        </Switch>
      </div>
    );
  }
  
}

export default App;
