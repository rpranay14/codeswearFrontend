import React, {useState,useEffect}  from 'react';
import ModalContactComponent from './ModalContactComponent';


const MyAccountComponent = (props) => {
  const [showForm, setShowForm] = useState(false);

  
  

 
useEffect(() => {
  props.fetchingAddress("62b54b1aa3d79a69e1498b9b");

  
}, [])



  return (
    <>
    <div className='mx-auto my-9'>
      <h1 className='text-2xl text-center font-bold'>Update Your Account </h1>
      {!props?.address ?
      <div>
        <p>No Saved Address</p>
        <button>Add New</button>
      </div>:
      <div className='ml-2'>
       <p className='mt-2 mb-3 text-lg font-bold '>Saved Address</p> 
       <div className='border-2 inline-block pl-2 pr-3 pt-2 pb-2'>
       <p className='font-semibold'>{props.address?.name}</p>
       <p>{props.address?.address}</p>
       <p>{props.address?.city}, {props.address?.state} - {props.address?.pincode}</p>
       <p>Phone number: {props.address?.phone}</p>
       <div className='flex space-x-2 mt-6 text-teal-500 font-semibold '>
        <button onClick={()=>setShowForm(true)} className='hover:underline'>Edit</button>
        <button className='hover:underline'>Remove</button>
       </div>
       </div>
      </div> }
      {showForm
       && <ModalContactComponent onCLose={()=>setShowForm(false)} auth={props.auth} editingAddress={props.editingAddress} showForm={showForm} address={props.address} />}
    </div>
    </>
  )
}

export default MyAccountComponent;
