import React from 'react';
import { FaUserFriends } from 'react-icons/fa';

const ParentPortal = () => {
  return (
    <div className="container">
      <h1><FaUserFriends /> Parent Portal Login</h1>
      <form className="login-form">
        <input type="email" placeholder="Enter Parent Email" />
        <button type="submit" className="btn-primary">View Student Progress</button>
      </form>
    </div>
  );
};

export default ParentPortal;