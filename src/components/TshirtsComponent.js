import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import tshirtimg from "../components/images/tshirtphoto.jpg";

const TshirtsComponent = (props) => {
  useEffect(() => {
   

    props.fetchProducts();


  }, []);
  const prod = props.products.map((pro) => (
   

      <div className="lg:w-1/5 md:w-1/2 p-4 w-full m-2 shadow-xxl border-2 rounded-md " key={pro._id}>
        <Link to={`/tshirts/${pro._id}`}>
         
            <img alt="ecommerce" className="  object-cover object-center  h-[36vh] block" src={pro.img} />
            
          <div className="mt-4">
            <h3 className="text-gray-900 text-xs tracking-widest title-font mb-1">{pro.category}</h3>
            <h2 className="text-gray-900 title-font text-lg font-medium">{pro.title}</h2>
            <div className="flex">
            {pro.size[0].Qty!==0 &&  <p className='mr-1'>S</p> }
            {pro.size[1].Qty!==0 && <p className='mr-1'>M</p>}
            {pro.size[2].Qty!==0 && <p className='mr-1'>L</p>}
            {pro.size[3].Qty!==0 && <p className='mr-1'>XL</p>}
            </div>
            
            <p className="mt-1 text-black-400">₹{pro.price}</p>
            
          </div>
        </Link>
      </div>
  ));




  return (
    <>
      <section className="text-gray-600 body-font  ">
        <div className="container px-5 py-24 pl-8">
          <div className="flex flex-wrap -m-4 justify-center content-center">


            {prod}
          </div>
        </div>
      </section>
    </>
  )
}

export default TshirtsComponent