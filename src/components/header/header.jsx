import React from 'react';
import { auth } from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.scss';

const Header = ({ currentUser }) => {
  return (<div className='header'>
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>SHOP</Link>
      <Link className='option' to='/contact'>CONTACT</Link>
      {
        currentUser ?
        <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div> :
        <Link className='option' to='/sign-in'>SIGN IN</Link>
      }
    </div>

  </div>);
}

const mapStateToProps = state => {
  return { currentUser: state.user.currentUser }
}
// connect is a higher order component that passes props into another component from redux
export default connect(mapStateToProps)(Header);