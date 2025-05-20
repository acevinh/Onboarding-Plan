import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPermission } from "../../api/permissionApi";
import { createRoles } from "../../api/roleApi";



export const useRoleEdit = ()=>{
 const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    permissions: []
  });

  const [allPermissions, setAllPermissions] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        setLoading(true);
        const response = await getPermission();

        const data = await response.data;
        
        if (data.success) {
          setAllPermissions(data.permissions);
        }
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePermissionChange = (permissionId) => {
    setFormData(prev => {
      if (prev.permissions.includes(permissionId)) {
        return {
          ...prev,
          permissions: prev.permissions.filter(id => id !== permissionId)
        };
      } else {
        return {
          ...prev,
          permissions: [...prev.permissions, permissionId]
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!formData.name) newErrors.name = "Role name is required";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    // console.log(formData.permissions);
    
    try {
      setLoading(true);
      JSON.stringify({
          name: formData.name,
          permission: formData.permissions
        })
      const response = await createRoles(formData);

    

      const result = await response.data;
      
      if (result.success) {
        setSuccessMessage("Role created successfully!");
        setTimeout(() => {
          navigate('/role-list');
        }, 2000);
      } else {
        setErrorMessage(result.message || "Failed to create role");
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    formData,
allPermissions,
errors,
successMessage,
errorMessage,
loading,
handleInputChange,
handlePermissionChange,
handleSubmit
  }
}