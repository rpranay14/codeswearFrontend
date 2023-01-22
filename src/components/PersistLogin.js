import {Outlet} from 'react-router-dom';
import {useState,useEffect} from 'react';
import React from 'react'

const PersistLogin = (props) => {
  const [isLoading,setIsLoading]=useState(true);
  useEffect(()=>{
    const verifyRefreshToken=async ()=>{
        try{
                   await props.getAccessToken();
                    
        }
        catch (err){
            console.log(err);
        }
        finally{
          setIsLoading(false);
        }

    }
    !props.auth?.token ? verifyRefreshToken() : setIsLoading(false);
  })
return(
    <>
    {isLoading ? <p>Loading...</p> : <Outlet />
               
            }
    </>
)
}


export default PersistLogin