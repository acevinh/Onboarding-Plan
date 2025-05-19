import axios from './axiosInstance';

export const getUsers = () => {
  return axios.get('/users'); 
};
export const getUserDetail = (userId) => {
  return axios.get(`/users/edit/${userId}`);
};