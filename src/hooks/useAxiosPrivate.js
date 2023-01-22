import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { axiosPrivate } from "../api/axios";
import { useSelector, useDispatch } from 'react-redux';
import { saveAccessToken ,getAccessToken} from '../redux/ActionCreators';


const useAxiosPrivate = () => {
    const dispatch = useDispatch();
const accessToken = useSelector((state) => state.auth.token);
    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                    console.log("Inside Axios Private Hook")
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await dispatch(getAccessToken());
                   
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    prevRequest.headers['Content-type'] = 'application/json';
                   
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [])

    return axiosPrivate;
}

export default useAxiosPrivate;