import axios from "./axiosInstance";

export const deleteMultipleDiscounts = (discountIds) => {
    return axios.delete("/discounts/delete-multiple", {
        data: { discountIds },
    });
};
export const updateStatusMultipleDiscounts = (discountIds, status) => {
    return axios.post("/discounts/update-status-multiple", {
        discountIds,
        status,
    });
};
export const createDiscount = (data) => {
    return axios.post("/discounts", data);
};
export const getCreateDiscountData = (storeId) => {
    return axios.get(`/discounts/create/${storeId}`);
};
export const getEditDiscountData = (discountId) => {
    return axios.get(`discounts/edit/${discountId}`);
};
export const removeProductFromDiscount = ({ product_id, discount_id }) => {
    return axios.post("/discounts/remove-product", {
        product_id,
        discount_id,
    });
};
export const clearProductsFromDiscount = (discount_id) => {
  return axios.post('/discounts/clear-products', { discount_id });
};
export const updateDiscount = (discountId, data) => {
  return axios.put(`/discounts/${discountId}`, data);
};