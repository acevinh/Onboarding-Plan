
import { Navigate } from "react-router-dom";
import { useRoleEdit } from "../../../hooks/role/useRoleEdit";
// import { useEffect } from "react";

const EditRole = () => {
    const {
        formData,
         allPermissions,
        errors,
        successMessage,
        errorMessage,
        loading,
        handleInputChange,
        handlePermissionChange,
        handleSubmit,
    }=useRoleEdit();

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
                            onClick={() => Navigate(-1)}
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
