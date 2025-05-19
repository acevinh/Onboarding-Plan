import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoleData, updateRole } from "../../../api/roleApi";
import { getPermission } from "../../../api/permissionApi";

const EditRole = () => {
    const { roleId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: roleId,
        name: "",
        permissions: [],
    });

    const [allPermissions, setAllPermissions] = useState([]);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);
    // const token = localStorage.getItem("auth_token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const permissionsResponse = await getPermission();
                const permissionsData = await permissionsResponse.data;
                // Fetch role data
                const roleResponse = await getRoleData(roleId)
                // if (!roleResponse.ok) {
                //     throw new Error("Failed to fetch role data");
                // }
                const roleData = await roleResponse.data;

                if (permissionsData.success && roleData.success) {
                    setAllPermissions(permissionsData.permissions);
                    setFormData({
                        id: roleData.data.role.id,
                        name: roleData.data.role.name,
                        permissions: roleData.data.role.permissions.map(
                            (p) => p.id
                        ),
                    });
                } else {
                    throw new Error("API request failed");
                }
            } catch (err) {
                setErrorMessage(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [roleId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePermissionChange = (permissionId) => {
        setFormData((prev) => {
            if (prev.permissions.includes(permissionId)) {
                return {
                    ...prev,
                    permissions: prev.permissions.filter(
                        (id) => id !== permissionId
                    ),
                };
            } else {
                return {
                    ...prev,
                    permissions: [...prev.permissions, permissionId],
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

        try {
            setLoading(true);
const response = await updateRole(roleId, formData);
    const result = response.data;

            if (result.success) {
                setSuccessMessage("Role updated successfully!");
                setTimeout(() => {
                    navigate("/role-list");
                }, 2000);
            } else {
                setErrorMessage(result.message || "Failed to update role");
            }
        } catch (err) {
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && allPermissions.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p>Loading role data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Header */}
            <div className="flex items-center mb-6">
                <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
                    <ion-icon
                        name="shield-outline"
                        className="text-2xl"
                    ></ion-icon>
                    Edit Role: {formData.name}
                </h1>
            </div>

            {/* Success Message */}
            {successMessage && (
                <div className="alert alert-success shadow-lg mb-6">
                    <div>
                        <ion-icon
                            name="checkmark-circle"
                            className="text-xl"
                        ></ion-icon>
                        <span>{successMessage}</span>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {errorMessage && (
                <div className="alert alert-error shadow-lg mb-6">
                    <div>
                        <ion-icon
                            name="alert-circle"
                            className="text-xl"
                        ></ion-icon>
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
                        Role Information
                    </h2>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6">
                    {/* Basic Information Section */}
                    <div className="grid grid-cols-1 gap-6 mb-8">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Role Name
                                </span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter role name"
                                className={`input input-bordered w-full ${
                                    errors.name ? "input-error" : ""
                                }`}
                                value={formData.name}
                                onChange={handleInputChange}
                                disabled={loading}
                            />
                            {errors.name && (
                                <label className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.name}
                                    </span>
                                </label>
                            )}
                        </div>

                        {/* Permissions Selection */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Permissions
                                </span>
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {allPermissions.map((permission) => (
                                    <div
                                        key={permission.id}
                                        className="form-control"
                                    >
                                        <label className="label cursor-pointer justify-start gap-4">
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-primary"
                                                checked={formData.permissions.includes(
                                                    permission.id
                                                )}
                                                onChange={() =>
                                                    handlePermissionChange(
                                                        permission.id
                                                    )
                                                }
                                                disabled={loading}
                                            />
                                            <span className="label-text">
                                                {permission.name}
                                            </span>
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
                            Update Role
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditRole;
