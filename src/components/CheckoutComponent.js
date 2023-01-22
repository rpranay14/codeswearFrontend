import React, { useEffect } from "react";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Button,
  Label,
  Form,
  Input,
} from "reactstrap";
import { baseUrl } from "../shared/baseUrl";

const CheckoutComponent = (props) => {
  const navigate = useNavigate();

  const [firstname, setfirstname] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState("");
  const [coupon, setcoupon] = useState("");
  const [couponsuccess, setcouponsuccess] = useState(false);
  const [coupondiscount, setcoupondiscount] = useState(0);
  const [data, setdata] = useState("");
  const [key, setkey] = useState("");
  const [couponmsg, setcouponmsg] = useState("");
  var subtotal = props.cart.reduce((a, c) => a + c.price * c.quantity, 0);
  const [total, settotal] = useState(subtotal.toString());

  const razorpayL = () => {
    props.razorpayordercreationaction(
      props.auth.creds.userid,
      firstname,
      email,
      props.cart,
      address,
      city,
      state,
      pincode,
      phone,
      total,
      "PAID"
    );
  };

  const handleCoupon = () => {
    if (coupon === "") {
      setcouponmsg("Enter coupon code");
    } else {
      const newOrder = {
        coupon_code: coupon,
        cartvalue: subtotal,
      };
      return fetch(baseUrl + "coupon/checkcoupon", {
        method: "POST",
        body: JSON.stringify(newOrder),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((message) => {
          if (!message.success) {
            setcouponsuccess(false);
            setcouponmsg(message.message);
            console.log(couponsuccess);
            console.log(couponmsg);
          } else if (message.success) {
            setcouponsuccess(true);
            setcouponmsg(message.message);
            setcoupondiscount(message.discount);
            console.log(couponsuccess);
            console.log(couponmsg);
            settotal(subtotal - coupondiscount);
            console.log(total);
          }
        })
        .catch((error) => {
          console.log("Post orders ", error.message);
          alert("Your orders could not be posted\nError: " + error.message);
        });
    }
  };

  const handleChange = (e) => {
    setpincode(e.target.value);
    if (e.target.value.length == 6) {
      for (let i = 0; i < props.pins.length; i++) {
        if (props.pins[i].pincode == e.target.value) {
          setcity(props.pins[i].pincodecity);
          setstate(props.pins[i].pincodestate);
          break;
        } else {
          setcity("");
          setstate("");
        }
      }
    } else {
      setcity("");
      setstate("");
    }
  };
  useEffect(() => {
    if (props.ordersuccess) {
      navigate(`/order/${props.orderid}`);
    }
  }, [props.ordersuccess]);
  useEffect(() => {
    setcouponmsg("");
    setcoupondiscount(0);
  }, [coupon]);
  useEffect(() => {
    settotal(subtotal - coupondiscount);
  }, [coupondiscount]);

  return (
    <>
      <h1 className="text-2xl text-center font-bold mt-6">Checkout</h1>
      <div className="flex">
        <Form className="w-[70%]">
          <div className="ml-20 mr-20">
            <div>
              <p className="text-xl font-semibold mb-4">1. Delivery Details</p>
            </div>

            <div className="flex ">
              <div className=" w-1/3 mb-4 mr-20">
                <Label
                  htmlFor="full-name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Full Name
                </Label>
                <Input
                  value={firstname}
                  onChange={(e) => setfirstname(e.target.value)}
                  type="text"
                  id="full-name"
                  name="full-name"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                ></Input>
              </div>
              <div className=" w-1/3 mb-4">
                <Label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </Label>
                <Input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  type="text"
                  id="email"
                  name="email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                ></Input>
              </div>
            </div>

            <div>
              <div className=" mb-4 mr-20">
                <Label
                  htmlFor="address"
                  className="leading-7 text-sm text-gray-600"
                >
                  Address
                </Label>
                <Input
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                  type="text"
                  id="address"
                  name="address"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                ></Input>
              </div>
            </div>
            <div className="flex ">
              <div className=" w-1/3 mb-4 mr-20">
                <Label
                  htmlFor="phone"
                  className="leading-7 text-sm text-gray-600"
                >
                  Phone
                </Label>
                <Input
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  type="text"
                  id="phone"
                  name="phone"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                ></Input>
              </div>
              <div className=" w-1/3 mb-4">
                <Label
                  htmlFor="city"
                  className="leading-7 text-sm text-gray-600"
                >
                  City
                </Label>
                <Input
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                  type="text"
                  id="city"
                  name="city"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                ></Input>
              </div>
            </div>
            <div className="flex ">
              <div className=" w-1/3 mb-4 mr-20">
                <Label
                  htmlFor="state"
                  className="leading-7 text-sm text-gray-600"
                >
                  State
                </Label>
                <Input
                  value={state}
                  onChange={(e) => setstate(e.target.value)}
                  type="text"
                  id="state"
                  name="state"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                ></Input>
              </div>
              <div className=" w-1/3 mb-4">
                <Label
                  htmlFor="pincode"
                  className="leading-7 text-sm text-gray-600"
                >
                  Pincode
                </Label>
                <Input
                  value={pincode}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  id="pincode"
                  name="pincode"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                ></Input>
              </div>
            </div>
          </div>
        </Form>

        <div className="w-[24%] bg-teal-200 h-[20rem] mt-4 p-3">
          <p className="text-xl font-bold ml-4 mt-1">SUMMARY</p>
          <div className="flex space-x-24">
            <div className="ml-3 flex-col mt-3 space-y-2">
              <p>Subtotal</p>
              <p>Shipping Charge</p>
            </div>
            <div className="flex-col mt-3 space-y-2">
              <p>₹{subtotal}</p>
              <p>₹99</p>
            </div>
          </div>
          <div className="ml-3 flex mt-4 space-x-2">
            <Input
              placeholder="Apply Discount Code"
              value={coupon}
              onChange={(e) => setcoupon(e.target.value)}
              type="text"
              id="email"
              name="email"
              className=" h-8 bg-white rounded border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            ></Input>
            <Button
              onClick={() => handleCoupon()}
              className="pr-1 h-8 bg-teal-500 text-sm text-white font-bold p-1 rounded-sm"
            >
              Apply
            </Button>
          </div>
          <p
            className={`ml-3 ${
              couponsuccess ? "text-green-900" : "text-red-500"
            } `}
          >
            {couponmsg}
          </p>
          <div className="mt-6 flex space-x-40">
            <div className="ml-3 flex-col  space-y-1">
              <p>Discount</p>
              <p className="font-bold">TOTAL</p>
            </div>
            <div className="flex-col space-y-1">
              <p>₹{coupondiscount}</p>
              <p className="font-bold">₹{total}</p>
            </div>
          </div>

          <Button
            onClick={() => razorpayL()}
            className="w-[90%] mb-5 ml-3 mr-3 mx-auto mt-4 text-white bg-teal-500 border-0 py-1 px-2 focus:outline-none hover:bg-teal-600 rounded text-lg"
          >
            Pay{" "}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CheckoutComponent;
