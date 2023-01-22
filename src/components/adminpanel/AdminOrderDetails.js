import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
const AdminOrderDetails = () => {
  let {orderID}=useParams();
  const [singleorder, setsingleorder] = useState();
  const axiosPrivate=useAxiosPrivate();
  const navigate = useNavigate();
      const location = useLocation();
      const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async (props) => {
      
        try {
            const response = await axiosPrivate.get(`orders/admin/${orderID}`, {
                signal: controller.signal
            });
           console.log(response.data)
            isMounted && setsingleorder(response.data);
           
            setisLoading(true);
        } catch (err) {
            console.error(err);
           
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    getUsers();

    return () => {
        isMounted = false;
        controller.abort();
    }
  }, [])
  
  console.log(singleorder)
  return (
    
    <div>
      <div>
      <div className='font-bold text-lg'>1.User Information</div>
     <p>User Id:{singleorder?.userid}</p>
     <p>Name:{singleorder?.name}</p>
     <p>Email:{singleorder?.email}</p>
      </div>

      <div>
      <div className='font-bold text-lg'>2.Order Details</div>
    
      <p>Order Date:{singleorder?.createdAt}</p>
      </div>
      <div className='flex space-x-3'>
        {singleorder?.products.map((x)=>(
          <>
          <p><b>ProductID-</b>{x.productid}</p>
          <p><b>Name-</b>{x.name}</p>
          <p><b>Size-</b>{x.size}</p>
          <p><b>Quantity-</b>{x.quantity}</p>
          </>
        ))}
      </div>



      <div>
      <div className='font-bold text-lg'>3.Shipping Details</div>
     <p>Address: {singleorder?.address}</p>
     <p>City: {singleorder?.city}</p>
     <p>State: {singleorder?.state}</p>
     <p>Pincode: {singleorder?.pincode}</p>
     <p>Phone: {singleorder?.phone}</p>
      </div>


      <div>
      <div className='font-bold text-lg'>4.Razorpay Details</div>
     <p>Amount: {singleorder?.razorpay_details.amount}</p>
     <p>Paid: {singleorder?.razorpay_details.isPaid}</p>
     <p>RazorpayOrderId: {singleorder?.razorpay_details.razorpay_order_id}</p>
     <p>RazorpayPaymentId: {singleorder?.razorpay_details.razorpay_payment_id
}</p>
      </div>

      
     
    </div>
  )
}

export default AdminOrderDetails