import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPermisson } from "../../api/permissionApi";


export const usePermissionCreate = ()=>{
     const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    guard_name: 'web' // Default guard_name for permissions
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!formData.name) newErrors.name = "Permission name is required";
    if (!formData.guard_name) newErrors.guard_name = "Guard name is required";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    try {
      setLoading(true);
      
      const response =  await createPermisson(formData)

      const result = response.data;
      
      if (result.success) {
        setSuccessMessage("Permission created successfully!");
        setTimeout(() => {
          navigate('/permission-list');
        }, 2000);
      } else {
        setErrorMessage(result.message || "Failed to create permission");
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    navigate,
formData,
errors,
successMessage,
errorMessage,
loading,
handleInputChange,
handleSubmit,
  }
}