import React,{useEffect,useState} from 'react'
import {Navigate,Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = (props) => {
  
 const location=useLocation();
 console.log(props.Authen)
 console.log("allowed roles"+props.allowedRoles);
 console.log( props.Authen.userRoles)
const match=props.Authen.userRoles?.find((x)=>props.allowedRoles.includes(x))
console.log(match);
 if(props.Authen.token!==null){
    if(match.length===0){
return <p>Unauthorised</p>
    }
    else{
        console.log("Inside Protected Route else part")
return <Outlet/>
    }
 }
 else{
    return <Navigate to="/login" state={{from:location}} replace/>
 }
}
 export default ProtectedRoute;
 