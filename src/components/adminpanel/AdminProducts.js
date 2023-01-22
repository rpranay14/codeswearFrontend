import React, { useState,useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import {axiosapi} from '../../api/axios';


const AdminProducts = () => {

    const navigate = useNavigate();
        const location = useLocation();
  
    const [products, setproducts] = useState();
    const [isLoading, setisLoading] = useState(false);

    const columns = [
        { field: 'id', headerName: 'ID', width:  5 },
        { field: '_id', headerName: 'Product ID', width: 230},
        { field: 'title', headerName: 'Name', width: 130 },
        { field: 'createdAt', headerName: 'Date', width: 130 },
        { field: 'desc', headerName: 'Description', width: 150},
        { field: 'img', headerName: 'Image', width: 150},
        { field: 'price', headerName: 'price', width: 150},
        {field:'action',headerName:"Action",width:150,renderCell:rowData=>{
      return(
       <Link to={`/admin/productdetails/${rowData.id}`}><div className='cursor-pointer'>More Details</div></Link>
      
       ) }}
       
      ];
      useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
    
        const getUsers = async (props) => {
          
            try {
                const response = await axiosapi.get('products', {
                    signal: controller.signal
                });
               console.log(response.data)
                isMounted && setproducts(response.data.products);
               
                setisLoading(true);
            } catch (err) {
                console.error(err);
               
              
            }
        }
    
        getUsers();
    
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

  return (
   <>
   
   <div >
    <Link to="/admin/addproduct"><p className='mt-3 mb-3 bg-green-500 text-white rounded-md py-1 px-2 inline-block cursor-pointer' >Add New</p></Link>
   <div className='h-[100vh] w-[85vw]'>
   

        
          {isLoading ? <DataGrid
          rows={products}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          getRowId={(row) => row._id}
          checkboxSelection
         
        /> : <p>Loading</p>}
        </div>
        </div>
        
      </>
  )
}

export default AdminProducts