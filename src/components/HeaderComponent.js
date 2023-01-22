import React,{useState,useEffect} from 'react';
import imgs from '../components/images/rev_sliderhome22_1.png';
import imgf from "../components/images/rev_sliderhome22_2.png";
import imgt from "../components/images/rev_sliderhome22_t-shirt.png";
import imgmodel from "../components/images/rev_sliderhome22_model.png";
import { FaTshirt } from 'react-icons/fa';
import { FaTruck } from 'react-icons/fa';
import { AiFillGift } from 'react-icons/ai';
import {Link} from 'react-router-dom';
import ModelImage from '../components/images/offerimg.PNG'
import ModalComponent from './ModalComponent';


const HeaderComponent = (props) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  useEffect(()=>{
    if(!props.modal.modal)
    {
      setTimeout(() => {
        setisModalOpen(true);
        props.onModalStateChange(true);
      }, 4000);

     

    }

                            
  },[])
 
  
  const prod = props.products.filter((x) => x.featured === true);
  return (
    <>

      <div>
        <div className='h-[80vh] bg-teal-400 flex gap-28 '>
          <img src={imgf} className="h-[28rem] "></img>
          <img src={imgmodel} className="h-[74%] absolute top-[5.74rem] left-44"></img>
          <div className='flex flex-col justify-center items-center'>
            <p className='text-white font-bold text-6xl text-center'>EXCLUSIVE DESIGNS</p>
            <button className="bg-white rounded-sm py-2 px-7 mt-10 text-sm font-semibold">Shop now</button>
            

          </div>
          <img src={imgs} className="h-[80vh]"></img>
          <img src={imgt} className=" absolute h-[25rem] left-[60rem] top-[8rem] z-0"></img>
        </div>
      </div>
      <div className="mt-6">
        <p className='text-center font-bold text-3xl mb-10 '>Featured Products</p>
        <div className="flex flex-wrap gap-8 justify-center items-center">
          {prod.map((x) => (
           <Link to={`/tshirts/${x._id}`}>
            <div className="flex  flex-col justify-center items-center gap-2 ">
              <div className=" bg-gray-500">
                <img src={x.img} className="  w-64 h-64" />
              </div>
              <div className="flex  flex-col justify-center items-center gap-2 ">
                <p className="text-center font-bold text-gray-400">{x.category}</p>
                <p className="text-center font-bold ">{x.title}</p>
                <p className="text-center font-bold text-teal-500">₹{x.price}</p>
              </div>

            </div>
            </Link>


          ))}


        </div>





      </div>
      <div>

      </div>
      <div className='flex mt-28 gap-10 justify-center items-center '>
        <div className='flex flex-col border-2 py-5 w-[30%] gap-2 rounded-md'>
        <FaTshirt className='text-teal-500 bg-teal-100  mx-auto text-4xl rounded-full p-2'/>
        <p className='mx-auto text-xl font-bold rounded-full p-2'>Premium Tshirts</p>
        <p className='mx-auto'>Our T-Shirts are 100% made of cotton.</p>
        </div>
        <div className='flex flex-col border-2 py-5   w-[30%] gap-2 rounded-md'>
          <FaTruck className='text-teal-500 bg-teal-100  mx-auto text-4xl rounded-full p-2' />
          <p className='mx-auto text-xl font-bold rounded-full p-2'>Free Shipping</p>
        <p className='mx-auto '>We ship all over India for FREE.</p>
        </div>
        <div className='flex flex-col border-2 py-5  w-[30%] gap-2 rounded-md'>
          <AiFillGift className='text-teal-500 bg-teal-100  mx-auto text-4xl rounded-full p-2' />
          <p className='mx-auto text-xl font-bold rounded-full p-2'>Exciting Offers</p>
          <p className='mx-auto'>We provide amazing offers on our products.</p>
        </div>
      

      </div>
    <ModalComponent  onClose={()=>setisModalOpen(false)} isModalOpen={isModalOpen}></ModalComponent>




    </>
  )

}

export default HeaderComponent;