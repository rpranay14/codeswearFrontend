import React from 'react';
import { useState,useEffect } from 'react';
import {Modal,ModalBody} from 'reactstrap';
import Modalimg from '../components/images/offerimg.PNG';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { axiosapi } from '../api/axios';


const ModalComponent = (props) => {
const [showCoupon, setshowCoupon] = useState(false)
const [email,setemail]=useState('');

const onSubmit= async ()=>{

try {

const response = await axiosapi.post(`email`,{'email':email});


setshowCoupon(!showCoupon);


} catch (err) {
console.error(err);
}

}


if(!props.isModalOpen) return null;
return ReactDOM.createPortal(
<>
<div onClick={props.onClose} className="fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.75)]">
<div onClick={(e)=>e.stopPropagation()} className="z-50 flex-col rounded-md text-center  fixed top-[25%] left-[30%] h-[19rem] w-[35rem] bg-white">

<div className='text-4xl mt-7 text-teal-800 font-semibold'>Get 10% Off <br/> Your First Order</div>

<div className='mt-5 text-sm'>Enter your Email.Get your 10% off coupon code.<br/>Be the first to know about all things on CODESWEAR</div>

{!showCoupon ? <> <div><input value={email} onChange={(e)=>setemail(e.target.value)} className='mt-5 border-1 w-[18rem] p-1 ' type="email" placeholder="Email address"/></div> <button onClick={()=>onSubmit()} className='bg-teal-800 text-white py-[0.30rem] px-8 mt-3 mb-4'>Get Coupon</button> </> : <p className='border-2 border-teal-500 inline-block border-dashed py-[0.40rem] px-12  mt-5 mb-3 bg-gray-300 font-semibold' >GET10</p>}
<div onClick={props.onClose}><AiOutlineClose  className='text-md  cursor-pointer absolute top-2 right-2 font-semibold'/></div>
</div>


</div>

</>,
document.getElementById('portal')
)
}

export default ModalComponent;