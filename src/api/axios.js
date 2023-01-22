import axios from 'axios';


export const axiosapi= axios.create({
baseURL:'https://codeswearapp.onrender.com/'
})
 

export const axiosPrivate=axios.create({
    baseURL:'https://codeswearapp.onrender.com/',
    headers:{'Content-type':'application/json'},
    withCredentials:true

})