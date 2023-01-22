import React, { useEffect, useRef, useState } from "react";
import logoimg from "../components/images/logo.PNG";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";

const NavbarComponent = (props) => {
  const [showList, setshowList] = useState(false);
  const [showSidebar, setshowSidebar] = useState(false);
  const navigate = useNavigate();

  const match = props.auth.userRoles?.includes("5150");

  const onclearCartbtn = () => {
    props.clearCart();
  };
  const handleSidebar = () => {
    setshowList(!showList);
  };
  const onQuantityAdd = (productid, name, size, price, quantity) => {
    props.addItemsToCart(productid, name, size, price, quantity);
  };
  const handleOnRemove = (productid, name, size, price, quantity) => {
    props.removeFromCart(productid, name, size, price, quantity);
  };

  const ref = useRef();
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const checkoutHandle = () => {
    props.handleOrderFailed();
    navigate("/checkout");
  };

  const subtotal = props.cart.reduce((a, c) => a + c.quantity * c.price, 0);

  return (
    <>
      <div>
        <nav className="flex bg-teal-400 justify-between pl-5 pr-5 pt-2 pb-2 sticky top-0 ">
          <ul className="flex space-x-5 ">
            <NavLink to="/">
              <li>
                <img src={logoimg} />{" "}
              </li>
            </NavLink>
            <NavLink to="/tshirts">
              <li className="font-semibold text-white cursor-pointer text-sm hover:text-teal-700 pt-2">
                Tshirts
              </li>
            </NavLink>
            <li className="font-semibold cursor-pointer text-sm  text-white hover:text-teal-700 pt-2">
              Hoodies
            </li>
            <li className="font-semibold cursor-pointer text-sm text-white hover:text-teal-700 pt-2">
              Mugs
            </li>
            <li className="font-semibold cursor-pointer text-sm text-white hover:text-teal-700 pt-2">
              Stickers
            </li>
            <NavLink to="/orders">
              <li className="font-semibold cursor-pointer text-sm text-white hover:text-teal-700 pt-2">
                Orders
              </li>
            </NavLink>
            {match ? (
              <NavLink to="/admin/dashboard">
                <li className="font-semibold cursor-pointer text-sm text-white hover:text-teal-700 pt-2">
                  Admin
                </li>
              </NavLink>
            ) : (
              <span></span>
            )}
          </ul>
          <ul className="flex space-x-5">
            <li className="cursor-pointer pt-2">
              {!props.auth.isAuthenticated ? (
                <Link to="/login">
                  <button className="bg-teal-600 text-white px-2 py-1 text-sm rounded-md">
                    Login
                  </button>{" "}
                </Link>
              ) : (
                <>
                  {" "}
                  <p
                    className="cursor-pointer font-bold text-teal-900 text-lg"
                    onClick={() => handleSidebar()}
                  >
                    Hi {props.auth.creds.name}
                  </p>
                </>
              )}
            </li>
            <li className="cursor-pointer pt-2">
              <AiOutlineShoppingCart
                onClick={() => toggleCart()}
                className="text-2xl"
              />
            </li>
          </ul>
        </nav>
      </div>

      {props.auth.isAuthenticated && showList && (
        <div className="absolute right-10 top-10 bg-teal-600 py-1 px-2 text-white z-50">
          <Link to="/profile">
            <p
              className="cursor-pointer border-b-2 border-teal-800 pb-0.5"
              onClick={() => handleSidebar()}
            >
              My Accounts
            </p>
          </Link>
          <Link to="/orders">
            {" "}
            <p
              className="cursor-pointer border-b-2 border-teal-800 pb-0.5"
              onClick={() => handleSidebar()}
            >
              My Orders
            </p>
          </Link>
          <p className="cursor-pointer" onClick={() => props.logoutUser()}>
            Logout
          </p>
        </div>
      )}

      <div
        ref={ref}
        className="bg-teal-200 sideCart h-full absolute top-0 right-0  py-10 w-[200px] transform transition-transform translate-x-full"
      >
        <div className="font-semibold text-xl text-center pt-4 pl-2">
          Shopping Cart
        </div>
        <span className="absolute top-5 right-2 text-2xl text-teal-600">
          <AiFillCloseCircle
            className="cursor-pointer"
            onClick={() => toggleCart()}
          />
        </span>
        <ol className="mt-4 list-decimal m-5">
          {props.cart.map((cart) => (
            <li className="flex mb-2">
              <div className="w-2/3 text-sm">
                {cart.name} ({cart.size})
              </div>
              <div className="w-1/3 text-sm flex content-center justify-center">
                <span className="text-xl mr-1 text-teal-500">
                  <BsFillPlusCircleFill
                    onClick={() =>
                      onQuantityAdd(
                        cart.productid,
                        cart.name,
                        cart.size,
                        cart.price,
                        cart.quantity
                      )
                    }
                    className="cursor-pointer"
                  ></BsFillPlusCircleFill>
                </span>
                {cart.quantity}
                <span>
                  <AiFillMinusCircle
                    onClick={() =>
                      handleOnRemove(
                        cart.productid,
                        cart.name,
                        cart.size,
                        cart.price,
                        cart.quantity
                      )
                    }
                    className="cursor-pointer text-xl ml-1 text-teal-500"
                  ></AiFillMinusCircle>
                </span>
              </div>
              <div></div>
            </li>
          ))}

          <div className="mt-16 font-bold">Subtotal: ₹{subtotal}</div>
          <div className="flex">
            <button
              onClick={() => checkoutHandle()}
              disabled={props.cart.length === 0}
              className="mx-auto mt-2 text-white bg-teal-500 disabled:bg-teal-300 border-0 py-1 px-2 focus:outline-none hover:bg-teal-600 rounded text-sm"
            >
              Checkout
            </button>
            <button
              disabled={props.cart.length === 0}
              className=" mx-auto mt-2  text-white bg-teal-500 disabled:bg-teal-300 border-0 py-1 px-2 focus:outline-none hover:bg-teal-600 rounded text-sm"
              onClick={() => onclearCartbtn()}
            >
              Clear Cart
            </button>
          </div>
        </ol>
      </div>
    </>
  );
};

export default NavbarComponent;
