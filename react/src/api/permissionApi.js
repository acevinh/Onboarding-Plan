import axios from "./axiosInstance";

export const getPermission = () => {
    return axios.get("/permissions");
};
export const deletePermission = ( id ) => {
    return axios.delete(`/permissions/${id}`);
};
export const getPermissionDetail = (id ) => {
    return axios.get(`/permissions/edit/${id}`);
};
export const updatePermission = ( psId, data ) => {
    return axios.post(`/permissions/${psId}`, data);
};
export const createPermisson = (data) => {
    return axios.post("/permissions", data);
}