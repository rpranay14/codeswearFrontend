import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import SuccessImg from "./images/green-mark.jpg";

const OrderComponent = (props) => {
  let { orderId } = useParams();

  useEffect(() => {
    props.fetchSingleOrder(orderId);
  }, []);

  return (
    <>
      <img src={SuccessImg} className="h-32 w-32 ml-[43rem]" />
      <p className="text-3xl  text-green-700  text-center">
        Thank You for your purchase
      </p>
      <div className="flex justify-between mt-16 ml-5 mr-5">
        <p className="text-lg">Your Order number is <span className="text-teal-700 font-semibold">{props?.singleorder._id}</span></p>
      <p className="text-lg">Order Date <span>18th December 2022</span></p>
      </div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 ">
          <div className=" flex flex-wrap">
            <div className="">
              <div class="flex border-t border-gray-200 py-2">
                <span class="text-gray-500 w-[20rem]">Name</span>
                <span class="ml-auto text-gray-900 w-[10rem] text-center">Quantity</span>
                <span class="ml-auto text-gray-900 w-[10rem]  text-center">Price</span>
              </div>
              <div class="flex flex-wrap border-t border-gray-200 py-2">
                {props.singleorder.products?.map((x) => (
                  <>
                    <span class="text-gray-500 max-w-xs w-[20rem]">
                      {x.name} ({x.size})
                    </span>
                    <span class="ml-auto text-gray-900 flex-wrap w-[10rem]  text-center">{x.quantity}</span>
                    <span class="ml-auto text-gray-900 flex-wrap w-[10rem] text-center">{x.price}</span>
                  </>
                ))}
              </div>

              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Subtotal:{props.singleorder.amount}
                </span>
                
              </div>
            </div>
           
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderComponent;
