import React from 'react';
import { useState,useEffect } from 'react';
import {Modal,ModalBody} from 'reactstrap';
import Modalimg from '../components/images/offerimg.PNG';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { axiosapi } from '../api/axios';
import {Row, Col, Button, Label, Form,Input } from "reactstrap";
import { baseUrl } from '../shared/baseUrl';


const ModalContactComponent = (props) => {
    const [firstname, setfirstname] = useState(props.address?.name);

    const [address, setaddress] = useState(props.address?.address);
    const [phone, setphone] = useState(props.address?.phone);
    const [city, setcity] = useState(props.address?.city);
    const [state, setstate] = useState(props.address?.state);
    const [pincode, setpincode] = useState(props.address?.pincode);
    const [success,setSuccess]=useState(false);
    
  
    const handleSubmit=async ()=> {

      const newAddress={
      userid:props.auth.creds.userid,
       name:firstname,
       address:address,
       phone:phone,
       pincode:pincode,
       city:city,
       state:state
    }
    const add=JSON.stringify(newAddress);
    console.log(add); 
    try {  
    const response = await axiosapi.put(`address/${props.auth.creds.userid}`,{credentials: 'include'},{"userid":props.auth.creds.userid,"name":firstname,"address":address,"phone":phone,"pincode":pincode,"city":city,"state":state});
    console.log(response.data)
  } catch (err) {
    console.error(err);
    }
   

       
      
    }
    const handleChange=(e)=>{
        setpincode(e.target.value);
        if(e.target.value.length==6){
          for(let i=0;i<props.pins.length;i++)
          {
            if(props.pins[i].pincode==e.target.value){
              setcity(props.pins[i].pincodecity);
              setstate(props.pins[i].pincodestate);
              break;
            }
            else{
              setcity('');
              setstate('');
            }
          }
        }
        else{
          setcity('');
          setstate('');
        }
      }
 
  
   
    if(!props.showForm) return null;
  return ReactDOM.createPortal(
    <>

    <div onClick={props.onClose} className="fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.75)]">
<div onClick={(e)=>e.stopPropagation()} className="z-50  rounded-md text-center  fixed top-[25%] left-[18%] h-[22rem] w-[50rem] bg-white">
  { !success ?  <><p className='font-bold text-lg mt-5 mb-2 text-center'>Edit Address</p>
    <Form   className='ml-32'>
    <div className='ml-2'>
     
       
        <div className='flex '>
        <div className=" w-1/3 mb-1 mr-8">
        <Label htmlFor="full-name" className="font-bold leading-4 text-sm text-gray-600">Full Name</Label>
        <Input value={firstname} onChange={(e)=>setfirstname(e.target.value)} type="text" id="full-name" name="full-name" className="w-full bg-white rounded border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-base outline-none text-gray-700 py-0.5 px-3 leading-8 transition-colors duration-200 ease-in-out"></Input>
      </div>
      <div className="w-1/3 mb-1 mr-8">
        <Label htmlFor="address" className="font-bold leading-7 text-sm text-gray-600">Address</Label>
        <Input value={address} onChange={(e)=>setaddress(e.target.value)} type="text" id="address" name="address" className="w-full bg-white rounded border border-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-base outline-none text-gray-700 py-0.5 px-3 leading-8 transition-colors duration-200 ease-in-out"></Input>
      </div>
      </div>

      <div >
       
      </div>
      <div className='flex '>
        <div className=" w-1/3 mb-1 mr-8">
        <Label htmlFor="phone" className="font-bold leading-7 text-sm text-gray-600">Phone</Label>
        <Input value={phone} onChange={(e)=>setphone(e.target.value)} type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-base outline-none text-gray-700 py-0.5 px-3 leading-8 transition-colors duration-200 ease-in-out"></Input>
      </div>
      <div className=" w-1/3 mb-1">
        <Label htmlFor="pincode" className="font-bold leading-7 text-sm text-gray-600">Pincode</Label>
        <Input value={pincode} onChange={(e)=>handleChange(e)} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-base outline-none text-gray-700 py-0.5 px-3 leading-8 transition-colors duration-200 ease-in-out"></Input>
      </div>
      
      </div>
      <div className='flex '>
      <div className=" w-1/3 mb-1 mr-8">
        <Label htmlFor="city" className="font-bold leading-7 text-sm text-gray-600">City</Label>
        <Input value={city} onChange={(e)=>setcity(e.target.value)} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-base outline-none text-gray-700 py-0.5 px-3 leading-8 transition-colors duration-200 ease-in-out"></Input>
      </div>
      
        <div className=" w-1/3 mb-1 ">
        <Label htmlFor="state" className="font-bold leading-7 text-sm text-gray-600">State</Label>
        <Input value={state} onChange={(e)=>setstate(e.target.value)} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-base outline-none text-gray-700 py-0.5 px-3 leading-8 transition-colors duration-200 ease-in-out"></Input>
      </div>
      
      </div>
      </div>
      <div className='flex space-x-1 ml-36 mt-3'>
      <Button onClick={()=>handleSubmit()}  className="  mt-2 text-white bg-teal-500 border-0 py-1 px-2 focus:outline-none hover:bg-teal-600 rounded text-sm">Save Changes </Button>
      <Button  className=" mt-2  bg-white-500 border-2 py-1 px-5 focus:outline-none  rounded text-sm">Cancel </Button>
      </div>
      </Form></>
 : <div className='flex-col' ><p>Changes Saved</p><button onClick={props.onClose}></button></div>}
      </div>
      </div>
    
    </>,
    document.getElementById('portal')
  )
}

export default ModalContactComponent;