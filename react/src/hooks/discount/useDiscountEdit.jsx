import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    clearProductsFromDiscount,
    getEditDiscountData,
    removeProductFromDiscount,
    updateDiscount,
} from "../../api/discountApi";

export const useDiscountEdit = () => {
    const { discountId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: discountId,
        store_id: "",
        campaign_name: "",
        campaign_code: "",
        campaign_type: "buy_x_discount_y",
        selected_products: [],
        rules: [],
    });

    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);
    // const token = localStorage.getItem("auth_token");

    useEffect(() => {
        const fetchDiscountData = async () => {
            try {
                setLoading(true);
                const response = await getEditDiscountData(discountId);

                // if (!response.ok) {
                //     throw new Error("Failed to fetch discount data");
                // }

                const data = await response.data;

                if (data.success) {
                    const discount = data.data.discount;

                    setFormData({
                        id: discount.id,
                        store_id: discount.store_id,
                        campaign_name: discount.campaign_name,
                        campaign_code: discount.campaign_code,
                        campaign_type: discount.campaign_type,
                        selected_products: data.data.discount_products.map(
                            (p) => p.product_id
                        ),
                        rules: data.data.discount_rules.map((rule) => ({
                            rule_id: rule.rule_id,
                            buy_from: rule.buy_from,
                            buy_to: rule.buy_to,
                            discount_value: rule.discount_value,
                            discount_type: rule.discount_type,
                            discount_unit: rule.discount_unit,
                            tag: rule.tag,
                        })),
                    });

                    setProducts(data.data.products);
                }
            } catch (err) {
                setErrorMessage(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDiscountData();
    }, [discountId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

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

    const removeRule = (index) => {
        const updatedRules = [...formData.rules];
        updatedRules.splice(index, 1);
        setFormData({
            ...formData,
            rules: updatedRules,
        });
    };

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

    const removeProduct = async (productId) => {
        try {
            // Kiểm tra xem product có trong danh sách đã lưu chưa
            const initialDataResponse = await getEditDiscountData(discountId);
            const initialData = await initialDataResponse.data;
            const savedProducts = initialData.data.discount_products.map(
                (p) => p.product_id
            );

            const isNewProduct = !savedProducts.includes(productId);

            if (isNewProduct) {
                // Nếu là product mới chưa lưu, chỉ cần xóa khỏi UI
                setFormData((prev) => ({
                    ...prev,
                    selected_products: prev.selected_products.filter(
                        (id) => id !== productId
                    ),
                }));
                return;
            }

            // Nếu product đã tồn tại trong DB, gọi API xóa
            setFormData((prev) => ({
                ...prev,
                selected_products: prev.selected_products.filter(
                    (id) => id !== productId
                ),
            }));

            const response = await removeProductFromDiscount({
                product_id: productId,
                discount_id: discountId,
            });
            const result = response.data;

            if (!result.success) {
                // Nếu API fail, chỉ hiển thị thông báo, không revert UI
                setErrorMessage(result.message || "Failed to remove product");
                setTimeout(() => setErrorMessage(""), 3000);
            }
        } catch (err) {
            setErrorMessage(err.message);
            setTimeout(() => setErrorMessage(""), 3000);
        }
    };

    const clearProducts = async () => {
        try {
            // Gọi API để xóa tất cả products khỏi discount
            const response = await clearProductsFromDiscount(discountId);
            const result = response.data;
            if (result.success) {
                setFormData({
                    ...formData,
                    selected_products: [],
                });
            } else {
                setErrorMessage(result.message || "Failed to clear products");
            }
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        const newErrors = {};
        if (!formData.campaign_name)
            newErrors.campaign_name = "Campaign name is required";
        if (formData.rules.length === 0)
            newErrors.rules = "At least one rule is required";

        formData.rules.forEach((rule, index) => {
            if (!rule.buy_from)
                newErrors[`rules.${index}.buy_from`] = "Buy from is required";
            if (!rule.discount_value)
                newErrors[`rules.${index}.discount_value`] =
                    "Discount value is required";
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            setLoading(true);
            // Prepare data for update
            const dataToSend = {
                store_id: formData.store_id,
                campaign_name: formData.campaign_name,
                campaign_code: formData.campaign_code,
                campaign_type: formData.campaign_type,
                rules: formData.rules,
                selected_products: formData.selected_products,
            };

            // Call update API
            const response = await updateDiscount(discountId, dataToSend);
            const result = response.data;

            if (result.success) {
                setSuccessMessage("Discount updated successfully!");
            } else {
                setErrorMessage(result.message || "Failed to update discount");
            }
        } catch (err) {
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Khi campaign_type thay đổi, nếu là "buy_x_discount_y" thì xóa tất cả products
        if (
            formData.campaign_type === "buy_x_discount_y" &&
            formData.selected_products.length > 0
        ) {
            clearProducts();
        }
    }, [formData.campaign_type]);

    const getProductById = (id) => {
        return products.find((product) => product.id === id);
    };
    return {
        formData,
        navigate,
        products,
        errors,
        successMessage,
        errorMessage,
        loading,
        handleInputChange,
        handleRuleChange,
        addRule,
        removeRule,
        addProduct,
        removeProduct,
        clearProducts,
        handleSubmit,
        getProductById,
    };
};
