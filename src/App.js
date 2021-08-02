import React from 'react';
import './App.css';
// react-router-dom enables routing behaviors in a react SPA
// named component renders for matching path
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import { setCurrentUser } from './redux/user/user.actions';

// Components
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import SignInPage from './pages/sign-in/sign-in';
import Header from './components/header/header';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
//import { create } from 'eslint/lib/rules/*';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            } //, () => console.log(this.state)
          );
        });
      }
      setCurrentUser(userAuth);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/sign-in' render={() => this.props.currentUser ? <Redirect to='/' /> : <SignInPage />} />
        </Switch>
      </div>
    );
  }
  
}

const mapStateToProps = ({ user }) => {
  return { currentUser: user.currentUser}
}

const mapDispatchToProps = dispatch => {
  return { setCurrentUser: user => dispatch(setCurrentUser(user)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
