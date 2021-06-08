import React from 'react';
import { withRouter } from 'react-router-dom';
import './menu-item.scss';

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => {
  return (
    <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
      <div className='background-image' style={{
      backgroundImage: `url(${imageUrl})`
    }} />
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NEW</span>
      </div>
    </div>
  );
}

// withRouter is a higher-order component that add router information to the component. This saves you having to pass router info down through child components in order to access it where you need it.
export default withRouter(MenuItem);