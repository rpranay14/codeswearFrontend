import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
import { useNavigate } from "react-router-dom";

export const fetchPin = () => (dispatch) => {
  return fetch(baseUrl + "pincodes")
    .then((response) => response.json())
    .then((pincodes) => dispatch(addpincodes(pincodes)));
};
export const fetchProductById = (productid) => (dispatch) => {
  dispatch(top_loading(50));
  return fetch(baseUrl + "products/" + productid, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          dispatch(top_loading(70));
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        // If login was successful, set the token in local storage

        dispatch(addSingleProduct(response.products));
        dispatch(top_loading(100));

        // Dispatch the success action
      } else {
        var error = new Error("Error " + response.status);
        error.response = response;
        throw error;
      }
    });
};
export const addSingleProduct = (singleproduct) => ({
  type: ActionTypes.FETCH_PRODUCT_BY_ID,
  payload: singleproduct,
});

export const removeFromCart =
  (productid, name, size, price, quantity) => (dispatch) => {
    const products = {
      productid: productid,
      name: name,
      size: size,
      price: price,
      quantity: quantity,
    };
    dispatch(remove_from_cart(products));
  };

export const remove_from_cart = (products) => ({
  type: ActionTypes.REMOVE_FROM_CART,
  payload: products,
});

export const addItemsToCart =
  (productid, name, size, price, quantity) => (dispatch) => {
    dispatch(top_loading(50));
    const products = {
      productid: productid,
      name: name,
      size: size,
      price: price,
      quantity: quantity,
    };
    dispatch(add_to_cart(products));
    dispatch(top_loading(100));
  };
export const add_to_cart = (products) => ({
  type: ActionTypes.ADD_TO_CART,
  payload: products,
});
export const clearCart = () => ({
  type: ActionTypes.CLEAR_CART,
});
export const fetchProducts = () => (dispatch) => {
  dispatch(top_loading(50));
  return fetch(baseUrl + "products")
    .then(
      (response) => {
        if (response.ok) {
          dispatch(top_loading(70));
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        // If login was successful, set the token in local storage

        dispatch(addProducts(response.products));
        dispatch(top_loading(100));

        // Dispatch the success action
      } else {
        var error = new Error("Error " + response.status);
        error.response = response;
        throw error;
      }
    });
};
export const addProducts = (products) => ({
  type: ActionTypes.ADD_PRODUCTS,
  payload: products,
});
export const addpincodes = (pincodes) => ({
  type: ActionTypes.FETCH_PINCODES,
  payload: pincodes,
});

export const loginUser = (username, password) => (dispatch) => {
  const newUser = {
    username: username,
    password: password,
  };
  dispatch(loginreq());
  dispatch(top_loading(50));
  return fetch(baseUrl + "log/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },

    mode: "cors",
    credentials: "include",
    body: JSON.stringify(newUser),
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;

          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        // If login was successful, set the token in local storage

        dispatch(loginsuccess(response));
        dispatch(top_loading(100));
        // Dispatch the success action
      } else {
        dispatch(loginfailed(response.message));
      }
    })
    .catch((error) => dispatch(loginfailed(error.message)));
};
export const loginsuccess = (response) => ({
  type: ActionTypes.LOGIN,
  payload: response,
});

export const loginreq = () => ({
  type: ActionTypes.LOGIN_REQ,
});
export const loginfailed = (errormsg) => ({
  type: ActionTypes.LOGIN_ERROR,
  payload: errormsg,
});
export const logoutUser = () => (dispatch) => {
  console.log("INSIDE LOGOUT ACTION");
  return fetch(baseUrl + "log/logout", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  })
    .then(
      (response) => {
        if (response.ok) {
          dispatch(top_loading(70));

          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        // If login was successful, set the token in local storage

        dispatch(logout());
        dispatch(top_loading(100));

        // Dispatch the success action
      } else {
        var error = new Error("Error " + response.status);
        error.response = response;
        throw error;
      }
    });
};
export const logout = () => ({
  type: ActionTypes.LOGOUT,
});

export const signupUser = (name, username, password) => (dispatch) => {
  const newUser = {
    name: name,
    username: username,
    password: password,
  };
  return fetch(baseUrl + "users/signup", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        dispatch(signup(response));
      } else {
        var error = new Error("Error " + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => error.message);
};
export const signup = (response) => ({
  type: ActionTypes.SIGNUP,
});

export const postOrders =
  (
    userid,
    name,
    email,
    products,
    address,
    city,
    state,
    pincode,
    phone,
    amount,
    status
  ) =>
  (dispatch) => {
    const newOrder = {
      userid: userid,
      name: name,
      email: email,
      products: products,
      address: address,
      city: city,
      state: state,
      pincode: pincode,
      phone: phone,
      amount: amount,
      status: status,
    };
    const bearer = "Bearer " + JSON.parse(localStorage.getItem("token"));

    return fetch(baseUrl + "orders", {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      credentials: "include",
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((response) => response.json())
      .then((response) => dispatch(addOrder(response)))
      .catch((error) => {
        console.log("Post orders ", error.message);
        alert("Your orders could not be posted\nError: " + error.message);
      });
  };
export const addOrder = (order) => ({
  type: ActionTypes.ADD_ORDER,
  payload: order,
});

export const fetchingorders = (orders) => ({
  type: ActionTypes.FETCH_ORDER,
  payload: orders,
});

export const getAccessToken = () => (dispatch) => {
  return fetch(baseUrl + "refresh", {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status === 401) {
        var error = new Error(response.status);
        error.response = response;
        throw error;
      } else {
        return response;
      }
    })
    .then((response) => response.json())
    .then((creds) => {
      dispatch(saveAccessToken(creds));

      return creds.accessToken;
    })
    .catch((error) => {
      refreshTokenExpired();
    });
};

export const saveAccessToken = (creds) => ({
  type: ActionTypes.REFRESH_ACCESS_TOKEN,
  payload: creds,
});
export const refreshTokenExpired = () => ({
  type: ActionTypes.REFRESH_TOKEN_EXPIRED,
});
export const refreshTokenPresent = () => ({
  type: ActionTypes.REFRESH_TOKEN_PRESENT,
});

export const fetchSingleOrder = (orderid) => (dispatch) => {
  return fetch(baseUrl + "orders/" + orderid)
    .then((response) => response.json())

    .then((orders) => dispatch(fetchingSingleOrders(orders)));
};
export const fetchingSingleOrders = (orders) => ({
  type: ActionTypes.FETCH_SINGLE_ORDER,
  payload: orders,
});

export const loginwithgoogle = (response) => (dispatch) => {
  const newUser = {
    token: response.credential,
  };
  return fetch(baseUrl + "log/google", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },

    mode: "cors",
    credentials: "include",
    body: JSON.stringify(newUser),
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;

          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        // If login was successful, set the token in local storage

        dispatch(loginsuccess(response));
        dispatch(top_loading(100));
        // Dispatch the success action
      } else {
        dispatch(loginfailed(response.message));
      }
    })
    .catch((error) => dispatch(loginfailed(error.message)));
};

export const fetchingAddress = (userid) => (dispatch) => {
  return fetch(baseUrl + `address/${userid}`, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": true,
      "Access-Control-Allow-Credentials": true,
    },
  })
    .then((response) => response.json())
    .then((address) => dispatch(fetchAddress(address)));
};
export const fetchAddress = (saddress) => ({
  type: ActionTypes.FETCH_ADDRESS,
  payload: saddress,
});

export const editingAddress = (address) => ({
  type: ActionTypes.EDIT_ADDRESS,
  payload: address,
});

export const top_loading = (progress) => ({
  type: ActionTypes.TOP_LOADING_CHANGE,
  payload: progress,
});

export const razorpayordercreationaction =
  (
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
  ) =>
  (dispatch) => {
    const amounts = {
      amount: subtotal * 100,
    };
    return fetch(baseUrl + "razorpay/create-order", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(amounts),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          dispatch(
            razorpaykeyaction(
              response.order,
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
        }
      })
      .catch((error) => console.log(error.message));
  };

export const razorpaykeyaction =
  (
    order,
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
  ) =>
  (dispatch) => {
    return fetch(baseUrl + "razorpay/get-razorpay-key", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          dispatch(
            razorpaycheckout(
              order,
              response.key,
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
        }
      })
      .catch((error) => console.log(error.message));
  };

export const razorpaycheckout =
  (
    data,
    key,
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
  ) =>
  (dispatch) => {
    var options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        const order = {
          userid: userid,
          name: name,
          email: email,
          products: products,
          address: address,
          city: city,
          state: state,
          pincode: pincode,
          phone: phone,
          amount: data.amount,

          razorpay_details: {
            amount: data.amount,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: data.id,
            razorpay_signature: response.razorpay_signature,
          },
        };
        console.log(JSON.stringify(order));
        return fetch(baseUrl + "razorpay/pay-order", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(order),
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.success) {
              dispatch(addOrder(response.order_id));
              dispatch(handleOrderSuccess());
            }
          });
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
export const handleOrderSuccess = () => ({
  type: ActionTypes.ORDER_SUCCESS,
});
export const handleOrderFailed = () => ({
  type: ActionTypes.ORDER_FAILED,
});

export const onModalStateChange = (modalstate) => ({
  type: ActionTypes.MODAL_TRIGGER,
  payload: modalstate,
});
