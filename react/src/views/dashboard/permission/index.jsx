
import { Link } from "react-router-dom";

import { usePermissionIndex } from "../../../hooks/permission/usePermissionIndex";

function PermissionIndex() {
    const {
        permissions,
        loading,
        error,
        handleDelete,
        formatDate,
    }=usePermissionIndex();

    if (loading) {
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
                <div className="alert alert-error">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Error: {error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center gap-3">
                    <ion-icon
                        name="albums-outline"
                        className="text-3xl text-primary"
                    ></ion-icon>
                    <h1 className="text-2xl font-bold">
                        Permission Management
                    </h1>
                </div>
                <div className="flex gap-3">
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="Search permissions..."
                            className="input input-bordered w-full md:w-auto"
                        />
                    </div>
                    <Link to="/permission/create" className="btn btn-primary">
                        <ion-icon
                            name="add-outline"
                            className="mr-2"
                        ></ion-icon>
                        Create Permission
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="card bg-base-100 shadow">
                    <div className="card-body p-4">
                        <div className="flex items-center gap-4">
                            <div
                                className="rounded-full bg-primary/50 "
                                style={{
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "50px",
                                    paddingTop: "16px",
                                }}
                            >
                                <ion-icon
                                    name="albums"
                                    className="text-2xl text-primary"
                                ></ion-icon>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Total Permissions
                                </h2>
                                <p className="text-2xl font-bold">
                                    {permissions.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow">
                    <div className="card-body p-4">
                        <div className="flex items-center gap-4">
                            <div
                                className="rounded-full bg-success/50 "
                                style={{
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "50px",
                                    paddingTop: "16px",
                                }}
                            >
                                <ion-icon
                                    name="checkmark-done"
                                    className="text-2xl text-success"
                                ></ion-icon>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Recently Added
                                </h2>
                                <p className="text-xl font-bold">
                                    {permissions.length > 0
                                        ? formatDate(
                                              permissions[
                                                  permissions.length - 1
                                              ].created_at
                                          )
                                        : "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Permissions Table */}
            <div className="card bg-base-100 shadow-lg">
                <div className="card-body p-0">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="bg-base-200">
                                    <th>Permission</th>
                                    <th>Guard Name</th>
                                    <th>Created At</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {permissions.map((permission) => (
                                    <tr
                                        key={permission.id}
                                        className="hover:bg-base-200/50"
                                    >
                                        <td>
                                            <div className="font-medium">
                                                {permission.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                ID: {permission.id}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-sm">
                                                {permission.guard_name}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-sm">
                                                {formatDate(
                                                    permission.created_at
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex justify-end gap-1">
                                                <Link
                                                    to={`/permission/edit/${permission.id}`}
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
                                                        handleDelete(
                                                            permission.id
                                                        )
                                                    }
                                                    className="btn btn-ghost btn-sm text-error"
                                                    title="Delete"
                                                >
                                                    <ion-icon
                                                        name="trash-outline"
                                                        className="text-lg"
                                                    ></ion-icon>
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
            {permissions.length === 0 && (
                <div className="card bg-base-100 shadow-lg mt-8">
                    <div className="card-body items-center text-center py-16">
                        <ion-icon
                            name="albums-outline"
                            className="text-5xl text-gray-400 mb-4"
                        ></ion-icon>
                        <h2 className="text-xl font-semibold">
                            No Permissions Found
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Get started by creating your first permission
                        </p>
                        <Link
                            to="/permission/create"
                            className="btn btn-primary"
                        >
                            <ion-icon
                                name="add-outline"
                                className="mr-2"
                            ></ion-icon>
                            Create Permission
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PermissionIndex;
