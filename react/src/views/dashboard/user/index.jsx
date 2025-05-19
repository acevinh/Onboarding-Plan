import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../../../api/userApi";

function UserIndex() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const token = localStorage.getItem("auth_token");

    useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (response.data.success) {
          setUsers(response.data.data);
        } else {
          setError('Không lấy được dữ liệu.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-error shadow-lg">
                <div>
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
                    <ion-icon name="people-outline" className="text-3xl text-primary"></ion-icon>
                    <h1 className="text-2xl font-bold">User Management</h1>
                </div>
                {/* <div className="flex gap-3">
                    <div className="form-control">
                        <input 
                            type="text" 
                            placeholder="Search users..." 
                            className="input input-bordered w-full md:w-auto" 
                        />
                    </div>
                </div> */}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="card bg-base-100 shadow">
                    <div className="card-body p-4">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-primary/50" style={{
                                height: "50px",
                                display: "flex",
                                justifyContent: "center",
                                width: "50px",
                                paddingTop: "16px",
                            }}>
                                <ion-icon name="people" className="text-2xl text-primary"></ion-icon>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">Total Users</h2>
                                <p className="text-2xl font-bold">{users.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow">
                    <div className="card-body p-4">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-success/50" style={{
                                height: "50px",
                                display: "flex",
                                justifyContent: "center",
                                width: "50px",
                                paddingTop: "16px",
                            }}>
                                <ion-icon name="checkmark-circle" className="text-2xl text-success"></ion-icon>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">Active Users</h2>
                                <p className="text-2xl font-bold">
                                    {users.filter(user => user.status === "Active").length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow">
                    <div className="card-body p-4">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-warning/50" style={{
                                height: "50px",
                                display: "flex",
                                justifyContent: "center",
                                width: "50px",
                                paddingTop: "16px",
                            }}>
                                <ion-icon name="shield-checkmark" className="text-2xl text-warning"></ion-icon>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">Admins</h2>
                                <p className="text-2xl font-bold">
                                {users.filter(user => user.roles.includes("admin")).length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="card bg-base-100 shadow-lg">
                <div className="card-body p-0">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="bg-base-200">
                                    <th className="w-16"></th>
                                    <th>User</th>
                                    <th>Contact</th>
                                    <th>Status</th>
                                    <th>Roles</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-base-200/50">
                                        <td>
                                            <div className="avatar">
                                                <div className="w-10 rounded-full">
                                                    <img src={user.avatar} alt={user.username} />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-medium">{user.username}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </td>
                                        <td>
                                            {user.phone ? (
                                                <div className="flex items-center gap-1">
                                                    <ion-icon name="call-outline" className="text-gray-500"></ion-icon>
                                                    <span>{user.phone}</span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">No phone</span>
                                            )}
                                        </td>
                                        <td>
                                            <span className={`badge ${user.status === "Active" ? 'badge-success' : 'badge-error'}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td>
                                        <div className="flex flex-wrap gap-1">
                                                {user.roles && user.roles.length > 0 ? (
                                                    user.roles.map((role, index) => (
                                                        <span key={index} className="badge badge-outline">
                                                            {role}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="badge badge-secondary">User</span>
                                                )}
                                                </div>
                                                </td>
                                                <td>
                                                    <div className="flex justify-end gap-1">
                                                        <Link 
                                                            to={`/user/edit/${user.id}`}
                                                            className="btn btn-ghost btn-sm text-warning"
                                                            title="Edit"
                                                        >
                                                            <ion-icon name="create-outline" className="text-lg"></ion-icon>
                                                        </Link>
                                                        {/* <button
                                                            className="btn btn-ghost btn-sm text-error"
                                                            title="Delete"
                                                        >
                                                            <ion-icon name="trash-outline" className="text-lg"></ion-icon>
                                                        </button> */}
                                                {/* <button
                                                    className="btn btn-ghost btn-sm text-info"
                                                    title="View Details"
                                                >
                                                    <ion-icon name="eye-outline" className="text-lg"></ion-icon>
                                                </button> */}
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
            {users.length === 0 && (
                <div className="card bg-base-100 shadow-lg mt-8">
                    <div className="card-body items-center text-center py-16">
                        <ion-icon name="people-outline" className="text-5xl text-gray-400 mb-4"></ion-icon>
                        <h2 className="text-xl font-semibold">No Users Found</h2>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserIndex;