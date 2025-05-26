// src/api.js

// Hàm gọi API lấy thông tin user (đã đăng nhập)
// export const fetchUser = async () => {
//     const token = localStorage.getItem('token');
  
//     const response = await fetch('http://cmsremake.test/api/user', {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       }
//     });
  
//     if (!response.ok) {
//       throw new Error('Unauthorized hoặc lỗi khác');
//     }
  
//     return await response.json();
//   };
  