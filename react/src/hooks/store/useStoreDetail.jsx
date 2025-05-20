// hooks/useStoreDetails.js
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStoresDetails } from "../../api/storeApi";
import { deleteMultipleDiscounts, updateStatusMultipleDiscounts, deleteDiscount as deleteDiscountApi } from "../../api/discountApi";


export const useStoreDetail = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const discountsPerPage = 5;

  // Fetch store details
  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        setLoading(true);
        const response = await getStoresDetails(id);
        const data = response.data;
        
        if (data.success) {
          setStore(data.data);
        } else {
          setError("Failed to fetch store details");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreDetails();
  }, [id]);

  // Pagination logic
  const indexOfLastDiscount = currentPage * discountsPerPage;
  const indexOfFirstDiscount = indexOfLastDiscount - discountsPerPage;
  const currentDiscounts = store?.discounts?.slice(indexOfFirstDiscount, indexOfLastDiscount) || [];
  const totalPages = Math.ceil((store?.discounts?.length || 0) / discountsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Discount selection handlers
  const toggleDiscountSelection = (discountId) => {
    setSelectedDiscounts(prev =>
      prev.includes(discountId)
        ? prev.filter(id => id !== discountId)
        : [...prev, discountId]
    );
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked && store?.discounts) {
      setSelectedDiscounts(store.discounts.map(d => d.id));
    } else {
      setSelectedDiscounts([]);
    }
  };

  // Date formatting
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Discount operations
  const deleteSelectedDiscounts = async () => {
    if (selectedDiscounts.length === 0) {
      setErrorMessage('Please select at least one discount to delete');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    if (window.confirm('Are you sure you want to delete the selected discounts?')) {
      try {
        const response = await deleteMultipleDiscounts(selectedDiscounts);
        const data = response.data;
        
        if (data.success) {
          setStore(prev => ({
            ...prev,
            discounts: prev.discounts.filter(d => !selectedDiscounts.includes(d.id))
          }));
          setSelectedDiscounts([]);
          setSuccessMessage('Selected discounts deleted successfully!');
          setTimeout(() => setSuccessMessage(''), 3000);
        }
      } catch (err) {
        setErrorMessage(err.message);
        setTimeout(() => setErrorMessage(''), 3000);
      }
    }
  };

  const updateStatusForSelected = async (status) => {
    if (selectedDiscounts.length === 0) {
      setErrorMessage("Please select at least one discount to update");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    const action = status ? "activate" : "deactivate";
    if (window.confirm(`Are you sure you want to ${action} the selected discounts?`)) {
      try {
        const response = await updateStatusMultipleDiscounts(selectedDiscounts, status);
        const data = response.data;
        
        if (data.success) {
          setStore(prev => ({
            ...prev,
            discounts: prev.discounts.map(d =>
              selectedDiscounts.includes(d.id) ? { ...d, status } : d
            )
          }));
          setSuccessMessage(`Discounts ${action}d successfully!`);
          setTimeout(() => setSuccessMessage(""), 3000);
        }
      } catch (err) {
        setErrorMessage(err.message);
        setTimeout(() => setErrorMessage(""), 3000);
      }
    }
  };

  const deleteDiscount = async (discountId) => {
    if (window.confirm("Are you sure you want to delete this discount?")) {
      try {
        const response = await deleteDiscountApi(discountId);

        const data = response.data;
        if (data.success) {
          setStore(prev => ({
            ...prev,
            discounts: prev.discounts.filter(d => d.id !== discountId)
          }));
          setSuccessMessage("Discount deleted successfully!");
          setTimeout(() => setSuccessMessage(""), 3000);
        }
      } catch (err) {
        setErrorMessage(err.message);
        setTimeout(() => setErrorMessage(""), 3000);
      }
    }
  };

  return {
    store,
    loading,
    error,
    selectedDiscounts,
    successMessage,
    errorMessage,
    currentPage,
    discountsPerPage,
    currentDiscounts,
    totalPages,
    paginate,
    toggleDiscountSelection,
    toggleSelectAll,
    formatDate,
    deleteSelectedDiscounts,
    updateStatusForSelected,
    deleteDiscount
  };
};