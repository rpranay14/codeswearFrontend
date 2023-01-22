import React, { useState,useEffect } from 'react'
import { DataGrid, GridColDef, GridRowEditStartReasons, GridValueGetterParams } from '@mui/x-data-grid';
import {axiosapi} from '../../api/axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate'









const AdminOrder = () => {
  const [orderID, setorderID] = useState();
  const axiosPrivate=useAxiosPrivate();
  const navigate = useNavigate();
      const location = useLocation();

  const [orders, setorders] = useState();
  const [isLoading, setisLoading] = useState(false);
  const columns = [
    { field: 'id', headerName: 'ID', width:  5 },
    { field: '_id', headerName: 'Order ID', width: 230},
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'createdAt', headerName: 'Date', width: 130 },
    { field: 'del_status', headerName: 'Delivery Status', width: 150},
    { field: 'amount', headerName: 'Order Amount', width: 150},
    { field: 'city', headerName: 'City', width: 150},
    { field: 'state', headerName: 'State', width: 150},
    {field:'action',headerName:"Action",width:150,renderCell:rowData=>{
  return(
   <Link to={`/admin/orderdetails/${rowData.id}`}><div className='cursor-pointer'>More Details</div></Link>
  
   ) }}
   
  ];

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async (props) => {
      
        try {
            const response = await axiosPrivate.get('orders', {
                signal: controller.signal
            });
           console.log(response.data)
            isMounted && setorders(response.data);
           
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
  


  return (
    <div style={{ height: 600, width: '100%' }}>
      {isLoading ? <DataGrid
      rows={orders}
      columns={columns}
      pageSize={9}
      rowsPerPageOptions={[9]}
      getRowId={(row) => row._id}
      checkboxSelection
     
    /> : <p>Loading</p>}
    
  </div>
  )
}

export default AdminOrder