import axios from "./axiosInstance";

export const getDasboardData = (params={})=>{
return axios.get('/dashboard',{
    params
});

}