import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPermissionDetail, updatePermission } from "../../api/permissionApi";



export const usePermissionEdit = ()=>{
    const { psId } = useParams();
  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({
    name: '',
    guard_name: 'web'
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchPermission = async () => {
      try {
        setInitialLoading(true);
        const response = await getPermissionDetail(psId);
        const data = response.data;
        if (data) {
          setFormData({
            name: data.permission.name || '',
            guard_name: data.permission.guard_name || 'web'
          });
        }
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchPermission();
  }, [psId]);

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
      
      const response = await updatePermission(psId,formData);

      const result = await response.data;
      
      if (result.success) {
        setSuccessMessage("Permission updated successfully!");
        setTimeout(() => {
          navigate('/permission-list');
        }, 2000);
      } else {
        setErrorMessage(result.message || "Failed to update permission");
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };
  return{
    formData,
errors,
successMessage,
errorMessage,
loading,
initialLoading,
handleInputChange,
handleSubmit,
  }
}