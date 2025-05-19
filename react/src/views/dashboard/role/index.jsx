import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteRole, getRoles } from "../../../api/roleApi";

function RoleIndex() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [deletingId, setDeletingId] = useState(null);
    // const token = localStorage.getItem("auth_token");

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            setLoading(true);
            setError(null);
             const response = await getRoles();
    const data = response.data;

            if (data.success) {
                setRoles(data.data);
            } else {
                throw new Error(data.message || "API request failed");
            }
        } catch (err) {
            console.error("Fetch roles error:", err);
            setError(err.message || "Failed to fetch roles");
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this role?")) {
            return;
        }

        try {
            setDeletingId(id);
            setError(null);

            const response = await deleteRole(id);

        

            const result = response.data;

            if (!result.success) {
                throw new Error(result.message || "Failed to delete role");
            }

            setSuccessMessage("Role deleted successfully!");
            fetchRoles(); // Refresh the list

            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
            console.error("Delete error:", err);
            setError(err.message);
            setTimeout(() => setError(""), 3000);
        } finally {
            setDeletingId(null);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";

        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading && roles.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="alert alert-error shadow-lg">
                    <div>
                        <ion-icon name="alert-circle-outline"></ion-icon>
                        <span>Error: {error}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
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

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center gap-3">
                    <ion-icon
                        name="shield-outline"
                        className="text-3xl text-primary"
                    ></ion-icon>
                    <h1 className="text-2xl font-bold">Role Management</h1>
                </div>
                <div className="flex gap-3">
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="Search roles..."
                            className="input input-bordered w-full md:w-auto"
                        />
                    </div>
                    <Link to="/role/create" className="btn btn-primary">
                        <ion-icon
                            name="add-outline"
                            className="mr-2"
                        ></ion-icon>
                        Create Role
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="card bg-base-100 shadow">
                    <div className="card-body p-4">
                        <div className="flex items-center gap-4">
                            <div
                                className="rounded-full bg-primary/50"
                                style={{
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "50px",
                                    paddingTop: "16px",
                                }}
                            >
                                <ion-icon
                                    name="shield"
                                    className="text-2xl text-primary"
                                ></ion-icon>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Total Roles
                                </h2>
                                <p className="text-2xl font-bold">
                                    {roles.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow">
                    <div className="card-body p-4">
                        <div className="flex items-center gap-4">
                            <div
                                className="rounded-full bg-success/50"
                                style={{
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "50px",
                                    paddingTop: "16px",
                                }}
                            >
                                <ion-icon
                                    name="key"
                                    className="text-2xl text-success"
                                ></ion-icon>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Total Permissions
                                </h2>
                                <p className="text-2xl font-bold">
                                    {roles.reduce(
                                        (acc, role) =>
                                            acc + role.permissions.length,
                                        0
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow">
                    <div className="card-body p-4">
                        <div className="flex items-center gap-4">
                            <div
                                className="rounded-full bg-warning/50"
                                style={{
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "50px",
                                    paddingTop: "16px",
                                }}
                            >
                                <ion-icon
                                    name="time"
                                    className="text-2xl text-warning"
                                ></ion-icon>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Recently Added
                                </h2>
                                <p className="text-xl font-bold">
                                    {roles.length > 0
                                        ? formatDate(
                                              roles[roles.length - 1].created_at
                                          )
                                        : "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Roles Table */}
            <div className="card bg-base-100 shadow-lg">
                <div className="card-body p-0">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="bg-base-200">
                                    <th>Role</th>
                                    <th>Permissions</th>
                                    <th>Created At</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.map((role) => (
                                    <tr
                                        key={role.id}
                                        className="hover:bg-base-200/50"
                                    >
                                        <td>
                                            <div className="font-medium">
                                                {role.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                ID: {role.id}
                                            </div>
                                        </td>
                                        <td>
                                            {role.permissions.length > 0 ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {role.permissions.map(
                                                        (permission) => (
                                                            <span
                                                                key={
                                                                    permission.id
                                                                }
                                                                className="badge badge-outline"
                                                            >
                                                                {
                                                                    permission.name
                                                                }
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">
                                                    No permissions
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="text-sm">
                                                {formatDate(role.created_at)}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex justify-end gap-1">
                                                <Link
                                                    to={`/role/edit/${role.id}`}
                                                    className="btn btn-ghost btn-sm text-warning"
                                                    title="Edit"
                                                >
                                                    <ion-icon
                                                        name="create-outline"
                                                        className="text-lg"
                                                    ></ion-icon>
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(role.id)
                                                    }
                                                    className="btn btn-ghost btn-sm text-error"
                                                    title="Delete"
                                                    disabled={
                                                        deletingId === role.id
                                                    }
                                                >
                                                    {deletingId === role.id ? (
                                                        <span className="loading loading-spinner loading-xs"></span>
                                                    ) : (
                                                        <ion-icon
                                                            name="trash-outline"
                                                            className="text-lg"
                                                        ></ion-icon>
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Empty State */}
            {roles.length === 0 && (
                <div className="card bg-base-100 shadow-lg mt-8">
                    <div className="card-body items-center text-center py-16">
                        <ion-icon
                            name="shield-offline-outline"
                            className="text-5xl text-gray-400 mb-4"
                        ></ion-icon>
                        <h2 className="text-xl font-semibold">
                            No Roles Found
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Get started by creating your first role
                        </p>
                        <Link to="/role/create" className="btn btn-primary">
                            <ion-icon
                                name="add-outline"
                                className="mr-2"
                            ></ion-icon>
                            Create Role
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RoleIndex;
