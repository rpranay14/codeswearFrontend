import React,{useState,useEffect} from 'react';
import {Link,useNavigate,useLocation,useParams} from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, Row, Col, Button, Label, Form,Input } from "reactstrap";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
const ProductDetails = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState("");
  const [price, setprice] = useState("");
  const [quantity, setquantity] = useState("");
  const [category, setcategory] = useState("");
  const [sqty,setsqty]=useState('');
  const [sprice,setsprice]=useState('');
  const [mqty,setmqty]=useState('');
  const [mprice,setmprice]=useState('');
  const [lqty,setlqty]=useState('');
  const [lprice,setlprice]=useState('');
  const [xlqty,setxlqty]=useState('');
  const [xlprice,setxlprice]=useState('');


  let {productId}=useParams();
  const axiosPrivate=useAxiosPrivate();
const [products, setproducts] = useState()
  const navigate = useNavigate();
      const location = useLocation();
      const [isLoading, setisLoading] = useState(false);
  useEffect(() => {


    
    const controller = new AbortController();

    const getUsers = async (props) => {
      
        try {
            const response = await axiosPrivate.get(`products/${productId}`, {
                signal: controller.signal
            });
           console.log(response.data.products)
            setproducts(response.data.products);
            settitle(response.data.products.title);
            setdescription(response.data.products.desc);
            setimage(response.data.products.img);
            setprice(response.data.products.price);
            setquantity(response.data.products.availableqty);
            setcategory(response.data.products.category);
            setsqty(response.data.products.size[0].Qty);
            setsprice(response.data.products.size[0].price);
            setmqty(response.data.products.size[1].Qty);
            setmprice(response.data.products.size[1].price);
            setlqty(response.data.products.size[2].Qty);
            setlprice(response.data.products.size[2].price);
            setxlqty(response.data.products.size[3].Qty);
            setxlprice(response.data.products.size[3].price);
            
            setisLoading(true);
        } catch (err) {
            console.error(err);
           
          
        }
    }

    getUsers();

    return () => {
       
        controller.abort();
    }

  },[] )

  const handleSubmit=()=>{
    const sizearray=[
      {
        name:"small",
        price:sprice,
        Qty:sqty
      },
      {
        name:"medium",
        price:mprice,
        Qty:mqty,
      },
      {
        name:"large",
        price:lprice,
        Qty:lqty,
      },
      {
        name:"xtralarge",
        price:xlprice,
        Qty:xlqty
      }
    
    ]
    
    const newProduct={
      title:title,
      desc:description,
      img:image,
      category:category,
      price:price,
      availableqty:quantity,
      size:sizearray
    
    }
    console.log(newProduct)
const updateProducts= async()=>{
    try {
      const response = await axiosPrivate.put(`products/${productId}`,JSON.stringify(newProduct));
      console.log(response.data);
    }
    
    catch (err) {
      console.error(err);
     
    
  }}
  updateProducts();
  }
  const handleDelete=async()=>{
    try {
      const response = await axiosPrivate.delete(`products/${productId}`);
      console.log(response.data);
    }
    
    catch (err) {
      console.error(err);
     
    
  }
  }
  
  return (
   <><Form >
   <div className='ml-20 mr-20'>
     <div>
       <p className='text-xl font-semibold mb-4'>Product Details</p>
       </div>
      
       <div className='flex '>
       <div className=" w-1/3 mb-4 mr-20">
       <Label htmlFor="title" className="leading-7 text-sm text-gray-600">Title</Label>
       <Input defaultValue={title} onChange={(e)=>settitle(e.target.value)} type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></Input>
     </div>
     <div className=" w-1/3 mb-4">
       <Label htmlFor="description" className="leading-7 text-sm text-gray-600">Description</Label>
       <Input value={description} onChange={(e)=>setdescription(e.target.value)} type="text" id="description" name="description" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></Input>
     </div>
     </div>

     <div >
       <div className=" mb-4 mr-20">
       <Label htmlFor="image" className="leading-7 text-sm text-gray-600">Image</Label>
       <Input value={image} onChange={(e)=>setimage(e.target.value)} type="text" id="image" name="image" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></Input>
     </div>
     </div>
     <div className='flex '>
       <div className="w-1/3 mb-4 mr-20">
       <Label htmlFor="price" className="leading-7 text-sm text-gray-600">Price</Label>
       <Input value={price} onChange={(e)=>setprice(e.target.value)} type="number" id="price" name="price" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></Input>
     </div>
     <div className=" w-1/3 mb-4">
       <Label htmlFor="city" className="leading-7 text-sm text-gray-600">Quantity</Label>     
       <Input value={quantity} onChange={(e)=>setquantity(e.target.value)} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></Input>
     </div>
     </div>
     <div className='flex '>
       <div className="mb-4 mr-20">
       <input type="radio" id="contactChoice1" checked={category==='Tshirts'} name="contact" value="Tshirts" onChange={(e)=>setcategory(e.target.value)}/>
         <label htmlFor="Choice1"  >Tshirts</label>
           <input type="radio" id="contactChoice2"
            name="contact" value="Jeans" checked={category==='Jeans'} onChange={(e)=>setcategory(e.target.value)}/>
           <label htmlFor="Choice2">Jeans</label>
            </div>
            </div>
           
            <div>
            <Label htmlFor="Small Size" className="leading-7 text-sm text-gray-600">Small</Label>
          
       <div className="flex mb-4 mr-20">
       <Input placeholder='Available Quantity' value={sqty} onChange={(e)=>setsqty(e.target.value)} type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></Input>
       <Input  placeholder='Price' value={sprice} onChange={(e)=>setsprice(e.target.value)} type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></Input>
     </div>
     </div>



     <div>
     <Label htmlFor="Medium Size" className="leading-7 text-sm text-gray-600">Medium</Label>
          
          <div className="flex mb-4 mr-20">
          <Input placeholder='Available Quantity' value={mqty} onChange={(e)=>setmqty(e.target.value)} type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></Input>
          <Input  placeholder='Price' value={mprice} onChange={(e)=>setmprice(e.target.value)} type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></Input>
        </div>

     </div>


     <div>
     <Label htmlFor="Large Size" className="leading-7 text-sm text-gray-600">Large Size</Label>
          
          <div className="flex mb-4 mr-20">
          <Input placeholder='Available Quantity' value={lqty} onChange={(e)=>setlqty(e.target.value)} type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></Input>
          <Input  placeholder='Price' value={lprice} onChange={(e)=>setlprice(e.target.value)} type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></Input>
        </div>

     </div>



     <div>
     <Label htmlFor="XtraLarge Size" className="leading-7 text-sm text-gray-600">XtraLarge Size</Label>
          
          <div className="flex mb-4 mr-20">
          <Input placeholder='Available Quantity' value={xlqty} onChange={(e)=>setxlqty(e.target.value)} type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></Input>
          <Input  placeholder='Price' value={xlprice} onChange={(e)=>setxlprice(e.target.value)} type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></Input>
        </div>

     </div>
     


    
    <Button onClick={()=>handleSubmit()} className=" mr-2 mt-2 text-white bg-green-500 border-0 py-1 px-2 focus:outline-none hover:bg-green-600 rounded text-sm">Update </Button>
    <Button onClick={()=>handleDelete()} className=" mx-auto mt-2 text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded text-sm">Delete </Button>
   </div>
   </Form></>
  )
}

export default ProductDetails