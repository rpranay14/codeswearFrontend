import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <>
    <h2>404</h2>
    <p>Page not found</p>
    <Link to='/'><p>back to home</p></Link>
 
    </> 
    )
}

export default Error