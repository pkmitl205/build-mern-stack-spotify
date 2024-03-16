import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>The page you're looking for can't be found.</p>
      <Link to="/" className="home-link">Go Home</Link>
    </div>
  );
};

export default NotFound;