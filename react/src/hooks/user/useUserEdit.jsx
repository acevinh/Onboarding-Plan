// hooks/useUserEdit.js
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserDetail, updateUser } from "../../api/userApi";

export const useUserEdit = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: userId,
    username: "",
    email: "",
    roles: [],
  });

  const [allRoles, setAllRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await getUserDetail(userId);
        const data = response.data;
        
        if (data.success) {
          const user = data.data.user;
          const hasRoles = data.data.hasRoles;

          setFormData({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: Array.isArray(hasRoles) ? hasRoles : [],
          });
          setAllRoles(data.data.roles);
        }
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle role change
  const handleRoleChange = (roleId) => {
    setFormData((prev) => {
      if (prev.roles.includes(roleId)) {
        return {
          ...prev,
          roles: prev.roles.filter((id) => id !== roleId),
        };
      } else {
        return {
          ...prev,
          roles: [...prev.roles, roleId],
        };
      }
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);
      const response = await updateUser(userId, formData);
      const result = response.data;

      if (result.success) {
        setSuccessMessage("User updated successfully!");
        setTimeout(() => {
          navigate("/user");
        }, 2000);
      } else {
        setErrorMessage(result.message || "Failed to update user");
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    allRoles,
    errors,
    successMessage,
    errorMessage,
    loading,
    handleInputChange,
    handleRoleChange,
    handleSubmit,
  };
};