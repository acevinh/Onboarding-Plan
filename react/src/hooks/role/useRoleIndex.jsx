import { useEffect, useState } from "react";
import { deleteRole, getRoles } from "../../api/roleApi";

export const useRoleIndex = () => {
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

    return {
        roles,
        loading,
        error,
        successMessage,
        deletingId,
        handleDelete,
        formatDate,
    };
};
