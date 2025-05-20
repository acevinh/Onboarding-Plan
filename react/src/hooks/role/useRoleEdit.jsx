import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPermission } from "../../api/permissionApi";
import { getRoleData, updateRole } from "../../api/roleApi";

export const useRoleEdit = () => {
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
                const roleResponse = await getRoleData(roleId);
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
    return {
        formData,
        allPermissions,
        errors,
        successMessage,
        errorMessage,
        loading,
        handleInputChange,
        handlePermissionChange,
        handleSubmit,
    };
};
