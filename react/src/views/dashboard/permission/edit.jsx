import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PermissionEdit = () => {
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
        const response = await fetch(`http://cmsremake.test/api/permissions/edit/${psId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch permission data');
        }
        
        const data = await response.json();
        // console.log(data.permission.name);
        
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
      
      const response = await fetch(`http://cmsremake.test/api/permissions/${psId}`, {
        method: 'POST', // Note: Sử dụng POST với _method=PUT nếu backend của bạn dùng FormData
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
        },
        body: JSON.stringify({
          ...formData,
        //   _method: 'PUT' // Laravel's way to handle PUT via POST
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update permission');
      }

      const result = await response.json();
      
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

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p>Loading permission data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <ion-icon name="key-outline" className="text-2xl"></ion-icon>
          Edit Permission
        </h1>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="alert alert-success shadow-lg mb-6">
          <div>
            <ion-icon name="checkmark-circle" className="text-xl"></ion-icon>
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="alert alert-error shadow-lg mb-6">
          <div>
            <ion-icon name="alert-circle" className="text-xl"></ion-icon>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Form Container */}
      <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <ion-icon name="information-circle-outline"></ion-icon>
            Permission Information
          </h2>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Basic Information Section */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Permission Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter permission name"
                className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                value={formData.name}
                onChange={handleInputChange}
                disabled={loading}
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.name}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Guard Name</span>
              </label>
              <select
                name="guard_name"
                className={`select select-bordered w-full ${errors.guard_name ? 'select-error' : ''}`}
                value={formData.guard_name}
                onChange={handleInputChange}
                disabled={loading}
              >
                <option value="web">Web</option>
                <option value="api">API</option>
              </select>
              {errors.guard_name && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.guard_name}</span>
                </label>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <button 
              type="button" 
              className="btn btn-ghost"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn bg-blue-500/50 gap-2"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <ion-icon name="save-outline"></ion-icon>
              )}
              Update Permission
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PermissionEdit;