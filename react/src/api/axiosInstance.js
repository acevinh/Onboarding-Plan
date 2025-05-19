// src/api/axiosInstance.js
import axios from "axios";

const getToken = () => localStorage.getItem('auth_token');

const axiosInstance = axios.create({
  baseURL: 'http://cmsremake.test/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Gắn token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Xử lý lỗi và "throw" lỗi custom nếu backend trả success: false
axiosInstance.interceptors.response.use(
  (response) => {
    // Nếu backend trả success: false => quăng lỗi luôn để component xử lý
    if (response.data && response.data.success === false) {
      return Promise.reject(new Error(response.data.message || 'Yêu cầu không thành công.'));
    }
    return response;
  },
  (error) => {
    // Nếu là lỗi HTTP (status 4xx, 5xx)
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login'; // hoặc dùng navigate()
    }

    if (status === 403) {
      return Promise.reject(new Error('Bạn không có quyền truy cập.'));
    }

    if (status === 422) {
      const msg = error.response?.data?.message || 'Dữ liệu không hợp lệ.';
      return Promise.reject(new Error(msg));
    }

    const msg = error.response?.data?.message || error.message || 'Lỗi không xác định.';
    return Promise.reject(new Error(msg));
  }
);

export default axiosInstance;
