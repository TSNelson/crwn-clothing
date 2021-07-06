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
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
//import { create } from 'eslint/lib/rules/*';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
              }
            }, () => console.log(this.state)
          );
        });
      }
      this.setState({ currentUser: userAuth });
    })
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
