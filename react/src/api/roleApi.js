// src/api/roleApi.js
import axios from './axiosInstance';

// Lấy danh sách tất cả roles
export const getRoles = () => {
  return axios.get('/roles');
};
export const deleteRole = (id) =>{
    return axios.delete(`/roles/${id}`);
}
export const updateRole = (roleId, formData) => {
  return axios.post(`/roles/${roleId}`, {
    name: formData.name,
    permission: formData.permissions,
  });
};
export const getRoleData = (roleId) =>{
    return axios.get(`roles/edit/${roleId}`)
}
export const createRoles = (formData) => {
  return axios.post('/roles',{
name: formData.name,
permission: formData.permissions
  });
};
