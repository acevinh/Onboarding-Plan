import axios from './axiosInstance';

export const getStores = () =>{
    return axios.get('stores');
}
export const deleteStore = (id) => {
  return axios.delete(`/stores/${id}`);
}
export const getStoresDetails = (id) =>{
    return axios.get(`stores/${id}`);
}