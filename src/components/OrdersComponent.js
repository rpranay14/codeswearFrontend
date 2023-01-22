import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function OrdersComponent(props) {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [ORDERS, setORDERS] = useState();

  useEffect(() => {
    props.top_loading(50);

    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        props.top_loading(80);
        const response = await axiosPrivate.get(
          `orders/ordersbyuserid/${props.auth.creds?.userid}`,
          { credentials: "include" },
          {
            signal: controller.signal,
          }
        );
        setORDERS(response.data);
        props.top_loading(100);

        isMounted && props.fetchingorders(response.data);
      } catch (err) {
        console.error(err);
        props.logoutUser();
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  console.log(ORDERS);
  console.log(props.auth?.creds?.userid);
  const myorders = ORDERS;
  console.log(myorders);
  return (
    <div className="container mx-auto">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <h1 className="font-bold textt-2xl p-6">My orders</h1>
              <table className="min-w-full">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    OrderId
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Subtotal
                  </th>
                </tr>
                <tbody>
                  {myorders?.map((x) => (
                    <tr className="" key={x._id}>
                      <Link key={x._id} to={`/order/${x._id}`}>
                        <td className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          1
                        </td>
                        <td className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          {x._id}
                        </td>
                        <td className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          {x.email}
                        </td>
                        <td className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          {x.amount}
                        </td>
                      </Link>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersComponent;
