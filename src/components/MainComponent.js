import React, { Component } from "react";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import NavbarComponent from "./NavbarComponent";
import TshirtsComponent from "./TshirtsComponent";
import Error from "./Error";
import ProductComponent from "./ProductComponent";
import OrderComponent from "./OrderComponent";
import ContactComponent from "./ContactComponent";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import {
  onModalStateChange,
  fetchingorders,
  saveAccessToken,
  handleOrderFailed,
  razorpayordercreationaction,
  top_loading,
  fetchingAddress,
  editingAddress,
  removeFromCart,
  fetchPin,
  fetchProductById,
  loginwithgoogle,
  fetchProducts,
  addItemsToCart,
  clearCart,
  loginUser,
  logoutUser,
  signupUser,
  postOrders,
  fetchSingleOrder,
  getAccessToken,
} from "../redux/ActionCreators";
import CheckoutComponent from "./CheckoutComponent";
import SignUp from "./SignupComponent";
import Login from "./LoginComponent";
import OrdersComponent from "./OrdersComponent";
import ProtectedRoute from "./ProtectedRoute";
import MyAccountComponent from "./MyAccountComponent";
import LoadingBar from "react-top-loading-bar";
import PersistLogin from "./PersistLogin";
import AdminComponent from "./adminpanel/AdminComponent";
import AdminOrder from "./adminpanel/AdminOrder";
import AdminDashboard from "./adminpanel/AdminDashboard";
import AdminOrderDetails from "./adminpanel/AdminOrderDetails";
import AdminProducts from "./adminpanel/AdminProducts";
import AddProduct from "./adminpanel/AddProduct";
import ProductDetails from "./adminpanel/ProductDetails";

const mapDispatchToProps = (dispatch) => ({
  top_loading: (progress) => {
    dispatch(top_loading(progress));
  },
  loginwithgoogle: (response) => {
    dispatch(loginwithgoogle(response));
  },
  fetchPin: () => {
    dispatch(fetchPin());
  },
  fetchProducts: () => {
    dispatch(fetchProducts());
  },
  addItemsToCart: (productid, name, size, price, quantity) => {
    dispatch(addItemsToCart(productid, name, size, price, quantity));
  },
  clearCart: () => {
    dispatch(clearCart());
  },
  loginUser: (username, password) => {
    dispatch(loginUser(username, password));
  },
  logoutUser: () => dispatch(logoutUser()),
  signupUser: (name, username, password) => {
    dispatch(signupUser(name, username, password));
  },
  postOrders: (
    userid,
    firstname,
    email,
    products,
    address,
    city,
    state,
    pincode,
    phone,
    amount,
    status
  ) => {
    dispatch(
      postOrders(
        userid,
        firstname,
        email,
        products,
        address,
        city,
        state,
        pincode,
        phone,
        amount,
        status
      )
    );
  },
  fetchSingleOrder: (orderid) => {
    dispatch(fetchSingleOrder(orderid));
  },
  fetchProductById: (productid) => {
    dispatch(fetchProductById(productid));
  },
  removeFromCart: (productid, quantity, size) => {
    dispatch(removeFromCart(productid, quantity, size));
  },
  fetchingAddress: (userid) => {
    dispatch(fetchingAddress(userid));
  },
  editingAddress: (address) => {
    dispatch(editingAddress(address));
  },
  razorpayordercreationaction: (
    userid,
    name,
    email,
    products,
    address,
    city,
    state,
    pincode,
    phone,
    subtotal
  ) => {
    dispatch(
      razorpayordercreationaction(
        userid,
        name,
        email,
        products,
        address,
        city,
        state,
        pincode,
        phone,
        subtotal
      )
    );
  },
  getAccessToken: () => {
    dispatch(getAccessToken());
  },
  handleOrderFailed: () => {
    dispatch(handleOrderFailed());
  },
  getAccessToken: (token) => {
    dispatch(getAccessToken(token));
  },
  saveAccessToken: (token) => {
    dispatch(saveAccessToken(token));
  },
  fetchingorders: (orders) => {
    dispatch(fetchingorders(orders));
  },
  fetchingorders: (orders) => {
    dispatch(fetchingorders(orders));
  },
  onModalStateChange: (modalstate) => {
    dispatch(onModalStateChange(modalstate));
  },
});

const mapStateToProps = (state) => {
  return {
    pins: state.pins,
    products: state.products,
    carts: state.carts,
    grandtotal: state.grandtotal,
    auth: state.auth,
    orders: state.orders,
    address: state.address,
    progress: state.progress,
    ordersuccess: state.ordersuccess,
    modal: state.modal,
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPin();
    this.props.fetchProducts();
  }

  render() {
    return (
      <>
        <LoadingBar
          color="#009688"
          progress={this.props.progress.progress}
          onLoaderFinished={() => this.props.top_loading(0)}
          height={2}
        />

        <NavbarComponent
          handleOrderFailed={this.props.handleOrderFailed}
          removeFromCart={this.props.removeFromCart}
          logoutUser={this.props.logoutUser}
          addItemsToCart={this.props.addItemsToCart}
          cart={this.props.carts}
          clearCart={this.props.clearCart}
          auth={this.props.auth}
        />
        <Routes>
          <Route
            path="/signup"
            element={<SignUp signupUser={this.props.signupUser} />}
          />
          <Route
            path="/tshirts/:productId"
            element={
              <ProductComponent
                fetchProductById={this.props.fetchProductById}
                cart={this.props.carts}
                fetchProducts={this.props.fetchProducts}
                singleproduct={this.props.products.singleproduct}
                pins={this.props.pins.pincodes}
                add_to_cart={this.props.addItemsToCart}
              />
            }
          />
          <Route
            path="/"
            element={
              <HeaderComponent
                onModalStateChange={this.props.onModalStateChange}
                modal={this.props.modal}
                products={this.props.products.products}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                loginwithgoogle={this.props.loginwithgoogle}
                loginUser={this.props.loginUser}
                errormsg={this.props.auth.errormsg}
                isAuthenticated={this.props.auth.isAuthenticated}
              />
            }
          />
          <Route
            path="/tshirts"
            element={
              <TshirtsComponent
                auth={this.props.auth}
                fetchProducts={this.props.fetchProducts}
                products={this.props.products.products}
              />
            }
          ></Route>

          <Route
            path="/profile"
            element={
              <MyAccountComponent
                editingAddress={this.props.editingAddress}
                address={this.props.address.address}
                fetchingAddress={this.props.fetchingAddress}
                auth={this.props.auth}
                pins={this.props.pins.pincodes}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <CheckoutComponent
                ordersuccess={this.props.ordersuccess.orderPlaced}
                orderid={this.props.orders.orderid}
                pins={this.props.pins.pincodes}
                auth={this.props.auth}
                razorpayordercreationaction={
                  this.props.razorpayordercreationaction
                }
                postOrders={this.props.postOrders}
                cart={this.props.carts}
                clearCart={this.props.clearCart}
              />
            }
          />
          <Route
            element={
              <PersistLogin
                auth={this.props.auth}
                getAccessToken={this.props.getAccessToken}
              />
            }
          >
            <Route
              element={
                <ProtectedRoute
                  allowedRoles={["2001"]}
                  getAccessToken={this.props.getAccessToken}
                  saveAccessToken={this.props.saveAccessToken}
                  Authen={this.props.auth}
                />
              }
            >
              

              <Route
                path="/order/:orderId"
                element={
                  <OrderComponent
                    fetchSingleOrder={this.props.fetchSingleOrder}
                    orderid={this.props.orders.orderid}
                    singleorder={this.props.orders.singleorder}
                  />
                }
              />
            </Route>
          </Route>
          <Route
                path="/orders"
                element={
                  <OrdersComponent
                    top_loading={this.props.top_loading}
                    logoutUser={this.props.logoutUser}
                    fetchingorders={this.props.fetchingorders}
                    auth={this.props.auth}
                    orders={this.props.orders}
                  />
                }
              />
          <Route path="/contact" element={<ContactComponent />} />

          <Route
            element={
              <ProtectedRoute
                allowedRoles={["5150"]}
                getAccessToken={this.props.getAccessToken}
                saveAccessToken={this.props.saveAccessToken}
                Authen={this.props.auth}
              />
            }
          >
            <Route path="admin" element={<AdminComponent />}>
              <Route path="products" element={<AdminProducts />} />
              <Route path="addproduct" element={<AddProduct />} />
              <Route
                path="order"
                element={<AdminOrder logoutUser={this.props.logoutUser} />}
              />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route
                path="orderdetails/:orderID"
                element={<AdminOrderDetails />}
              />
              <Route
                path="productdetails/:productId"
                element={<ProductDetails />}
              />
            </Route>
          </Route>
        </Routes>

        <FooterComponent />
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
