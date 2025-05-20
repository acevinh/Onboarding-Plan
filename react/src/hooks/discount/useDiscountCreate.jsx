import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createDiscount, getCreateDiscountData } from "../../api/discountApi";

export const useDiscountCreate = () => {
    const { storeId } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    // const token = localStorage.getItem("auth_token");

    // Form state
    const [formData, setFormData] = useState({
        store_id: storeId,
        campaign_name: "",
        campaign_code: "",
        campaign_type: "buy_x_discount_y",
        selected_products: [],
        rules: [
            {
                buy_from: "",
                buy_to: "",
                discount_value: "",
                discount_type: "per_item",
                discount_unit: "percent",
                tag: "",
            },
        ],
    });

    const [errors, setErrors] = useState({});

    // Fetch products when component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await getCreateDiscountData(storeId);
                const data = response.data;

                if (data.success) {
                    setProducts(data.data.products);
                }
            } catch (error) {
                setApiError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [storeId]);

    // Validate form data
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Basic field validation
        if (!formData.campaign_name.trim()) {
            newErrors.campaign_name = "Campaign name is required";
            isValid = false;
        }

        // Rules validation
        if (!formData.rules || formData.rules.length === 0) {
            newErrors.rules = "At least one discount rule is required";
            isValid = false;
        } else {
            const ruleErrors = {};
            const rangeOverlaps = [];

            formData.rules.forEach((rule, index) => {
                const ruleError = {};

                // Required fields
                if (!rule.buy_from) {
                    ruleError.buy_from = "Buy from is required";
                    isValid = false;
                } else if (isNaN(rule.buy_from)) {
                    ruleError.buy_from = "Buy from must be a number";
                    isValid = false;
                }

                if (!rule.buy_to) {
                    ruleError.buy_to = "Buy to is required";
                    isValid = false;
                } else if (isNaN(rule.buy_to)) {
                    ruleError.buy_to = "Buy to must be a number";
                    isValid = false;
                } else if (
                    parseFloat(rule.buy_to) <= parseFloat(rule.buy_from)
                ) {
                    ruleError.buy_to = "Buy to must be greater than buy from";
                    isValid = false;
                }

                if (!rule.discount_value) {
                    ruleError.discount_value = "Discount value is required";
                    isValid = false;
                } else if (isNaN(rule.discount_value)) {
                    ruleError.discount_value =
                        "Discount value must be a number";
                    isValid = false;
                }

                if (Object.keys(ruleError).length > 0) {
                    ruleErrors[index] = ruleError;
                }

                // Check for range overlaps
                if (rule.buy_from && rule.buy_to) {
                    rangeOverlaps.push({
                        index,
                        from: parseFloat(rule.buy_from),
                        to: parseFloat(rule.buy_to),
                    });
                }
            });

            // Check for overlapping ranges
            for (let i = 0; i < rangeOverlaps.length; i++) {
                for (let j = 0; j < i; j++) {
                    const current = rangeOverlaps[i];
                    const previous = rangeOverlaps[j];

                    if (
                        (current.from >= previous.from &&
                            current.from <= previous.to) ||
                        (current.to >= previous.from &&
                            current.to <= previous.to) ||
                        (current.from <= previous.from &&
                            current.to >= previous.to)
                    ) {
                        ruleErrors[current.index] =
                            ruleErrors[current.index] || {};
                        ruleErrors[
                            current.index
                        ].range = `This rule overlaps with rule ${
                            previous.index + 1
                        }`;
                        isValid = false;
                    }
                }
            }

            if (Object.keys(ruleErrors).length > 0) {
                newErrors.rules = ruleErrors;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle rule changes
    const handleRuleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedRules = [...formData.rules];
        updatedRules[index] = {
            ...updatedRules[index],
            [name]: value,
        };
        setFormData({
            ...formData,
            rules: updatedRules,
        });
    };

    // Add new rule
    const addRule = () => {
        setFormData({
            ...formData,
            rules: [
                ...formData.rules,
                {
                    buy_from: "",
                    buy_to: "",
                    discount_value: "",
                    discount_type: "per_item",
                    discount_unit: "percent",
                    tag: "",
                },
            ],
        });
    };

    // Remove rule
    const removeRule = (index) => {
        const updatedRules = [...formData.rules];
        updatedRules.splice(index, 1);
        setFormData({
            ...formData,
            rules: updatedRules,
        });
    };

    // Add product
    const addProduct = (productId) => {
        if (!productId) return;

        if (!formData.selected_products.includes(parseInt(productId))) {
            setFormData({
                ...formData,
                selected_products: [
                    ...formData.selected_products,
                    parseInt(productId),
                ],
            });
        }
    };

    // Remove product
    const removeProduct = (productId) => {
        setFormData({
            ...formData,
            selected_products: formData.selected_products.filter(
                (id) => id !== productId
            ),
        });
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            // Prepare data to send - convert all values to strings
            const dataToSend = {
                store_id: String(formData.store_id),
                campaign_name: String(formData.campaign_name),
                campaign_code: String(formData.campaign_code),
                campaign_type: String(formData.campaign_type),
                selected_products: formData.selected_products.map(String),
                rules: formData.rules.map((rule) => ({
                    buy_from: String(rule.buy_from),
                    buy_to: String(rule.buy_to),
                    discount_value: String(rule.discount_value),
                    discount_type: String(rule.discount_type),
                    discount_unit: String(rule.discount_unit),
                    tag: String(rule.tag || ""),
                })),
            };

            // console.log('Data to send:', JSON.stringify(dataToSend, null, 2));

            const response = await createDiscount(dataToSend);
            const data = response.data;
            if (data.success) {
                setSuccessMessage(
                    data.message || "Discount created successfully!"
                );
                // Redirect after 3 seconds
                setTimeout(() => {
                    navigate(`/store-list/${storeId}`);
                }, 3000);
            }
        } catch (error) {
            setApiError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Find product by ID
    const getProductById = (id) => {
        return products.find((product) => product.id === id);
    };
    return {
        storeId,
        navigate,
        products,
        loading,
        apiError,
        successMessage,
        formData,
        errors,
        handleInputChange,
        handleRuleChange,
        addRule,
        removeRule,
        addProduct,
        removeProduct,
        handleSubmit,
        getProductById,
    };
};
