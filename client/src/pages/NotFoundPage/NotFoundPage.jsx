import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <h1>Not Found Page</h1>
      <Link to='/' className='btn btn-success'>Go Home</Link>
    </div>
  )
}

export default NotFoundPage;
