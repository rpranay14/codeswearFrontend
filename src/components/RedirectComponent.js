import React from 'react'
import { useNavigate } from 'react-router-dom'

function RedirectComponent() {
  const navigate=useNavigate();
  navigate('/home');
  
    return (
    <div>
      
    </div>
  
  
  )
}

export default RedirectComponent
