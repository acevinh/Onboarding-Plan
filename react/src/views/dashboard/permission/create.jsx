import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PermissionCreate = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    guard_name: 'web' // Default guard_name for permissions
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("auth_token");x

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
      
      const response = await fetch('http://cmsremake.test/api/permissions', {
        method: 'POST',
        headers: {
                        'Authorization': `Bearer ${token}`,  
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create permission');
      }

      const result = await response.json();
      
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

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <ion-icon name="key-outline" className="text-2xl"></ion-icon>
          Create New Permission
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
                placeholder="Enter permission name (e.g., 'create post')"
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
              className="btn bg-green-500/50 gap-2"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <ion-icon name="add-circle-outline"></ion-icon>
              )}
              Create Permission
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PermissionCreate;