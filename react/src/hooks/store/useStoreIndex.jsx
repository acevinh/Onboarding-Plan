import { useEffect, useState } from "react";
import { deleteStore, getStores } from "../../api/storeApi";

function useStoreIndex() {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    //   const token = localStorage.getItem('auth_token');
    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await getStores();
                const data = await response.data;
                if (data.success) {
                    setStores(data.data);
                } else {
                    setError("Failed to fetch stores");
                }
            } catch (err) {
                setError("Error fetching data: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStores();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this store?")) {
            try {
                const response = await deleteStore(id);

                const result = await response.data;
                if (result.success) {
                    setStores(stores.filter((store) => store.id !== id));
                    alert("Store deleted successfully");
                } else {
                    alert(result.message || "Failed to delete store");
                }
            } catch (err) {
                alert("Error deleting store: " + err.message);
            }
        }
    };

    const handleCloseDetails = () => {
        setShowDetails(false);
        setSelectedStore(null);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return {
        stores,
        loading,
        error,
        selectedStore,
        showDetails,
        handleDelete,
        handleCloseDetails,
        formatDate,
    };
}

export default useStoreIndex;
