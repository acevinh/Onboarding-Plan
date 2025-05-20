import { useEffect, useState } from "react";
import { deletePermission, getPermission } from "../../api/permissionApi";

export const usePermissionIndex = () => {
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPermissions();
    }, []);

    const fetchPermissions = async () => {
        try {
            const response = await getPermission();

            const data = await response.data;
            if (data.success) {
                setPermissions(data.permissions);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (
            window.confirm("Are you sure you want to delete this permission?")
        ) {
            try {
                const response = await deletePermission(id);
                if (response.data) {
                    console.log(response.data);
                }
                setPermissions(
                    permissions.filter((permission) => permission.id !== id)
                );
            } catch (err) {
                alert(err.message);
            }
        }
    };

    const formatDate = (dateString) => {
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
        permissions,
        loading,
        error,
        handleDelete,
        formatDate,
    };
};
