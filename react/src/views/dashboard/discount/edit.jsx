import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { clearProductsFromDiscount, getEditDiscountData, removeProductFromDiscount, updateDiscount } from "../../../api/discountApi";

const EditDiscount = () => {
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

         const response = await removeProductFromDiscount({ product_id: productId, discount_id: discountId });
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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p>Loading discount data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Header */}
            <div className="flex items-center mb-6">
                <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
                    <ion-icon
                        name="pricetags-outline"
                        className="text-2xl"
                    ></ion-icon>
                    Edit Discount Campaign for Store #{formData.store_id}
                </h1>
            </div>

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

            {/* Error Message */}
            {errorMessage && (
                <div className="alert alert-error shadow-lg mb-6">
                    <div>
                        <ion-icon
                            name="alert-circle"
                            className="text-xl"
                        ></ion-icon>
                        <span>{errorMessage}</span>
                    </div>
                </div>
            )}

            {/* Form Container */}
            <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-primary to-secondary p-6">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <ion-icon name="information-circle-outline"></ion-icon>
                        Campaign Information
                    </h2>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6">
                    {/* Basic Information Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Campaign Name
                                </span>
                            </label>
                            <input
                                type="text"
                                name="campaign_name"
                                placeholder="Summer Sale 2023"
                                className={`input input-bordered w-full ${
                                    errors.campaign_name ? "input-error" : ""
                                }`}
                                value={formData.campaign_name}
                                onChange={handleInputChange}
                                disabled={loading}
                            />
                            {errors.campaign_name && (
                                <label className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.campaign_name}
                                    </span>
                                </label>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Campaign Code
                                </span>
                            </label>
                            <input
                                type="text"
                                name="campaign_code"
                                placeholder="SUMMER23"
                                className="input input-bordered w-full"
                                value={formData.campaign_code}
                                onChange={handleInputChange}
                                disabled={loading}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Campaign Type
                                </span>
                            </label>
                            <select
                                name="campaign_type"
                                className="select select-bordered w-full"
                                value={formData.campaign_type}
                                onChange={handleInputChange}
                                disabled={loading}
                            >
                                <option value="buy_x_discount_y">
                                    Buy X Discount Y
                                </option>
                                <option value="discount by product">
                                    Discount by Product
                                </option>
                            </select>
                        </div>
                    </div>

                    {/* Product Selection (conditional) */}
                    {formData.campaign_type === "discount by product" && (
                        <div className="mb-8 p-6 bg-base-200 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">
                                Select Products
                            </h3>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <select
                                        id="productSelect"
                                        className="select select-bordered w-full"
                                        onChange={(e) =>
                                            addProduct(e.target.value)
                                        }
                                        defaultValue=""
                                        disabled={loading}
                                    >
                                        <option value="">
                                            Choose a product...
                                        </option>
                                        {products.map((product) => (
                                            <option
                                                key={product.id}
                                                value={product.id}
                                            >
                                                {product.name} (${product.price}
                                                )
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const select =
                                            document.getElementById(
                                                "productSelect"
                                            );
                                        addProduct(select.value);
                                        select.value = "";
                                    }}
                                    className="btn btn-primary gap-2"
                                    disabled={loading}
                                >
                                    <ion-icon name="add-outline"></ion-icon>
                                    Add Product
                                </button>
                            </div>

                            {/* Selected Products */}
                            {formData.selected_products.length > 0 && (
                                <div className="mt-4">
                                    <div className="flex flex-wrap gap-2">
                                        {formData.selected_products.map(
                                            (productId) => {
                                                const product =
                                                    getProductById(productId);
                                                return (
                                                    <div
                                                        key={productId}
                                                        className="badge badge-lg badge-primary gap-2"
                                                    >
                                                        {product?.name ||
                                                            `Product ID: ${productId}`}
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeProduct(
                                                                    productId
                                                                )
                                                            }
                                                            className="hover:text-error"
                                                            disabled={loading}
                                                        >
                                                            <ion-icon name="close"></ion-icon>
                                                        </button>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Discount Rules Section */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4">
                            Discount Rules
                        </h3>

                        {errors.rules && typeof errors.rules === "string" && (
                            <div className="alert alert-error mb-4">
                                <div>
                                    <ion-icon name="alert-circle"></ion-icon>
                                    <span>{errors.rules}</span>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            {formData.rules.map((rule, index) => (
                                <div
                                    key={index}
                                    className="card bg-base-200 shadow-sm"
                                >
                                    <div className="card-body">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {/* Buy From/To */}
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">
                                                        Buy From
                                                    </span>
                                                </label>
                                                <input
                                                    type="number"
                                                    name="buy_from"
                                                    placeholder="1"
                                                    className={`input input-bordered ${
                                                        errors[
                                                            `rules.${index}.buy_from`
                                                        ]
                                                            ? "input-error"
                                                            : ""
                                                    }`}
                                                    value={rule.buy_from}
                                                    onChange={(e) =>
                                                        handleRuleChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    disabled={loading}
                                                />
                                                {errors[
                                                    `rules.${index}.buy_from`
                                                ] && (
                                                    <label className="label">
                                                        <span className="label-text-alt text-error">
                                                            {
                                                                errors[
                                                                    `rules.${index}.buy_from`
                                                                ]
                                                            }
                                                        </span>
                                                    </label>
                                                )}
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">
                                                        Buy To
                                                    </span>
                                                </label>
                                                <input
                                                    type="number"
                                                    name="buy_to"
                                                    placeholder="5"
                                                    className="input input-bordered"
                                                    value={rule.buy_to}
                                                    onChange={(e) =>
                                                        handleRuleChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    disabled={loading}
                                                />
                                            </div>

                                            {/* Discount Value */}
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">
                                                        Discount Value
                                                    </span>
                                                </label>
                                                <input
                                                    type="number"
                                                    name="discount_value"
                                                    placeholder="10"
                                                    className={`input input-bordered ${
                                                        errors[
                                                            `rules.${index}.discount_value`
                                                        ]
                                                            ? "input-error"
                                                            : ""
                                                    }`}
                                                    value={rule.discount_value}
                                                    onChange={(e) =>
                                                        handleRuleChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    disabled={loading}
                                                />
                                                {errors[
                                                    `rules.${index}.discount_value`
                                                ] && (
                                                    <label className="label">
                                                        <span className="label-text-alt text-error">
                                                            {
                                                                errors[
                                                                    `rules.${index}.discount_value`
                                                                ]
                                                            }
                                                        </span>
                                                    </label>
                                                )}
                                            </div>

                                            {/* Discount Type */}
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">
                                                        Discount Type
                                                    </span>
                                                </label>
                                                <select
                                                    name="discount_type"
                                                    className="select select-bordered"
                                                    value={rule.discount_type}
                                                    onChange={(e) =>
                                                        handleRuleChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    disabled={loading}
                                                >
                                                    <option value="per_item">
                                                        Per Item
                                                    </option>
                                                    <option value="total">
                                                        Total
                                                    </option>
                                                </select>
                                            </div>

                                            {/* Discount Unit */}
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">
                                                        Discount Unit
                                                    </span>
                                                </label>
                                                <select
                                                    name="discount_unit"
                                                    className="select select-bordered"
                                                    value={rule.discount_unit}
                                                    onChange={(e) =>
                                                        handleRuleChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    disabled={loading}
                                                >
                                                    <option value="percent">
                                                        Percent (%)
                                                    </option>
                                                    <option value="fixed">
                                                        Fixed Amount
                                                    </option>
                                                </select>
                                            </div>

                                            {/* Tag */}
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">
                                                        Tag (optional)
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="tag"
                                                    placeholder="e.g. Summer Sale"
                                                    className="input input-bordered"
                                                    value={rule.tag || ""}
                                                    onChange={(e) =>
                                                        handleRuleChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>

                                        {formData.rules.length > 1 && (
                                            <div className="card-actions justify-end mt-4">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeRule(
                                                            index,
                                                            rule.rule_id
                                                        )
                                                    }
                                                    className="btn btn-error btn-sm gap-1"
                                                    disabled={loading}
                                                >
                                                    <ion-icon name="trash-outline"></ion-icon>
                                                    Remove Rule
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addRule}
                                className="btn btn-outline btn-primary gap-2"
                                disabled={loading}
                            >
                                <ion-icon name="add-circle-outline"></ion-icon>
                                Add Another Rule
                            </button>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() => navigate(-1)}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                <ion-icon name="save-outline"></ion-icon>
                            )}
                            Update Discount Campaign
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDiscount;
