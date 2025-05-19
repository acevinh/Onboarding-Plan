import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserDetail } from '../../../api/userApi';

const UserEdit = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    id: userId,
    username: '',
    email: '',
    roles: []
  });

  const [allRoles, setAllRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("auth_token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await getUserDetail(userId);
        
        // if (!response.ok) {
        //   throw new Error('Failed to fetch user data');
        // }
        
        const data = await response.data;
        // console.log(data.data.hasRoles);
        
        if (data.success) {
          const user = data.data.user;
          const hasRoles = data.data.hasRoles;
          
          setFormData({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: Array.isArray(hasRoles) ? hasRoles : []
          });
          // console.log(formData);
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


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRoleChange = (roleId) => {
    setFormData(prev => {
      if (prev.roles.includes(roleId)) {
        return {
          ...prev,
          roles: prev.roles.filter(id => id !== roleId)
        };
      } else {
        return {
          ...prev,
          roles: [...prev.roles, roleId]
        };
      }
    });
  };

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
      
      const response = await fetch(`http://cmsremake.test/api/users/${userId}`, {
        method: 'POST',
        headers: {
                        'Authorization': `Bearer ${token}`,  
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          roles: formData.roles
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const result = await response.json();
      
      if (result.success) {
        setSuccessMessage("User updated successfully!");
        setTimeout(() => {
          navigate('/user');
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <ion-icon name="person-outline" className="text-2xl"></ion-icon>
          Edit User: {formData.username}
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
            User Information
          </h2>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Basic Information Section */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                className={`input input-bordered w-full ${errors.username ? 'input-error' : ''}`}
                value={formData.username}
                onChange={handleInputChange}
                disabled={loading}
              />
              {errors.username && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.username}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.email}</span>
                </label>
              )}
            </div>

            {/* Roles Selection */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Roles</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {allRoles.map(role => (
                  <div key={role.id} className="form-control">
                    <label className="label cursor-pointer justify-start gap-4">
                      <input 
                        type="checkbox" 
                        className="checkbox checkbox-primary" 
                        checked={formData.roles.includes(role.id)}
                        onChange={() => handleRoleChange(role.id)}
                        disabled={loading}
                      />
                      <span className="label-text">{role.name}</span>
                    </label>
                  </div>
                ))}
              </div>
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
              className="btn btn-primary gap-2"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <ion-icon name="save-outline"></ion-icon>
              )}
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;