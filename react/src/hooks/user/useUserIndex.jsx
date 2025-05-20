// hooks/useUserManagement.js
import { useState, useEffect } from "react";
import { getUsers } from "../../api/userApi";

export const useUserIndex = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (response.data.success) {
          setUsers(response.data.data);
        } else {
          setError('Không lấy được dữ liệu.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Tính toán các thống kê
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === "Active").length;
  const adminUsers = users.filter(user => user.roles.includes("admin")).length;

  return {
    users,
    loading,
    error,
    totalUsers,
    activeUsers,
    adminUsers
  };
};