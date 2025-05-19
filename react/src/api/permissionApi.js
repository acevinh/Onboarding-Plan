import axios from './axiosInstance';

export const getPermission = () =>{
    return axios.get('/permissions');
}