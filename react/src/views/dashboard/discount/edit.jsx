import { useDiscountEdit } from "../../../hooks/discount/useDiscountEdit";

const EditDiscount = () => {
   const {
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
        // clearProducts,
        handleSubmit,
        getProductById,
   }=useDiscountEdit();

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
