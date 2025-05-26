import { Link } from "react-router-dom";
import { useStoreDetail } from "../../../hooks/store/useStoreDetail";

function StoreDetails() {
    const {
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
        isProcessing,
        paginate,
        toggleDiscountSelection,
        toggleSelectAll,
        formatDate,
        deleteSelectedDiscounts,
        updateStatusForSelected,
        deleteDiscount,
    } = useStoreDetail();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!store) return <div>Store not found</div>;

    return (
        <div className="p-4 max-w-7xl mx-auto">
            {/* Success and Error Messages */}
            {successMessage && (
                <div className="alert alert-info shadow-lg mb-6">
                    <div>
                        <ion-icon
                            name="information-circle-outline"
                            class="text-xl"
                        ></ion-icon>
                        <span>{successMessage}</span>
                        {isProcessing && (
                            <span className="loading loading-spinner loading-sm ml-2"></span>
                        )}
                    </div>
                </div>
            )}
            {/* Success and Error Messages */}
            {successMessage && (
                <div className="alert alert-success shadow-lg mb-6">
                    <div>
                        <ion-icon
                            name="checkmark-circle-outline"
                            class="text-xl"
                        ></ion-icon>
                        <span>{successMessage}</span>
                    </div>
                </div>
            )}
            {errorMessage && (
                <div className="alert alert-error shadow-lg mb-6">
                    <div>
                        <ion-icon
                            name="warning-outline"
                            class="text-xl"
                        ></ion-icon>
                        <span>{errorMessage}</span>
                    </div>
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Store Details - Sidebar */}
                <div className="lg:w-1/3">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="card-title text-2xl">
                                    <ion-icon
                                        name="storefront-outline"
                                        class="mr-2"
                                    ></ion-icon>
                                    Store Details
                                </h2>
                                <div className="badge badge-primary">
                                    ID: {store.id}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <ion-icon
                                        name="business-outline"
                                        class="text-xl mr-2 text-gray-500"
                                    ></ion-icon>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Name
                                        </p>
                                        <p className="font-medium">
                                            {store.name}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <ion-icon
                                        name="mail-outline"
                                        class="text-xl mr-2 text-gray-500"
                                    ></ion-icon>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Email
                                        </p>
                                        <p className="font-medium">
                                            {store.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <ion-icon
                                        name="call-outline"
                                        class="text-xl mr-2 text-gray-500"
                                    ></ion-icon>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Phone
                                        </p>
                                        <p className="font-medium">
                                            {store.phone}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <ion-icon
                                        name="earth-outline"
                                        class="text-xl mr-2 text-gray-500"
                                    ></ion-icon>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Country
                                        </p>
                                        <p className="font-medium">
                                            {store.country}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <ion-icon
                                        name="calendar-outline"
                                        class="text-xl mr-2 text-gray-500"
                                    ></ion-icon>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Install Date
                                        </p>
                                        <p className="font-medium">
                                            {formatDate(store.install_date)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <ion-icon
                                        name="calendar-clear-outline"
                                        class="text-xl mr-2 text-gray-500"
                                    ></ion-icon>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Uninstall Date
                                        </p>
                                        <p className="font-medium">
                                            {formatDate(store.uninstall_date)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <ion-icon
                                        name="pricetag-outline"
                                        class="text-xl mr-2 text-gray-500"
                                    ></ion-icon>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Plan
                                        </p>
                                        <span
                                            className={`badge ${
                                                store.plan === "free"
                                                    ? "badge-accent"
                                                    : "badge-primary"
                                            }`}
                                        >
                                            {store.plan}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <ion-icon
                                        name="stats-chart-outline"
                                        class="text-xl mr-2 text-gray-500"
                                    ></ion-icon>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Total Discounts
                                        </p>
                                        <div className="flex items-center">
                                            <span className="font-medium mr-2">
                                                {store.discounts.length}
                                            </span>
                                            <ion-icon name="pricetags-outline"></ion-icon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Discounts List - Main Content */}
                {/* Discounts List - Main Content */}
                <div className="lg:w-2/3">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <h2 className="card-title text-2xl">
                                    <ion-icon
                                        name="pricetags-outline"
                                        class="mr-2"
                                    ></ion-icon>
                                    Discount Campaigns
                                </h2>

                                <div className="flex flex-wrap gap-2">
                                    <Link
                                        to={`/discounts/create/${store.id}`}
                                        className="btn btn-primary btn-sm sm:btn-md"
                                    >
                                        <ion-icon
                                            name="add-outline"
                                            class="mr-1"
                                        ></ion-icon>
                                        Add Discount
                                    </Link>

                                    {selectedDiscounts.length > 0 && (
                                        <>
                                            <button
                                                className={`btn btn-error btn-sm sm:btn-md ${
                                                    isProcessing
                                                        ? "btn-disabled"
                                                        : ""
                                                }`}
                                                onClick={
                                                    deleteSelectedDiscounts
                                                }
                                                disabled={isProcessing}
                                            >
                                                {isProcessing ? (
                                                    <>
                                                        <span className="loading loading-spinner loading-sm"></span>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <ion-icon
                                                            name="trash-outline"
                                                            class="mr-1"
                                                        ></ion-icon>
                                                        Delete Selected
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                className={`btn btn-success btn-sm sm:btn-md ${
                                                    isProcessing
                                                        ? "btn-disabled"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    updateStatusForSelected(1)
                                                }
                                                disabled={isProcessing}
                                            >
                                                {isProcessing ? (
                                                    <>
                                                        <span className="loading loading-spinner loading-sm"></span>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <ion-icon
                                                            name="checkmark-outline"
                                                            class="mr-1"
                                                        ></ion-icon>
                                                        Activate
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                className={`btn btn-warning btn-sm sm:btn-md ${
                                                    isProcessing
                                                        ? "btn-disabled"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    updateStatusForSelected(0)
                                                }
                                                disabled={isProcessing}
                                            >
                                                {isProcessing ? (
                                                    <>
                                                        <span className="loading loading-spinner loading-sm"></span>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <ion-icon
                                                            name="close-outline"
                                                            class="mr-1"
                                                        ></ion-icon>
                                                        Deactivate
                                                    </>
                                                )}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th className="w-12">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox checkbox-primary"
                                                        checked={
                                                            selectedDiscounts.length ===
                                                                currentDiscounts.length &&
                                                            currentDiscounts.length >
                                                                0
                                                        }
                                                        onChange={
                                                            toggleSelectAll
                                                        }
                                                    />
                                                </label>
                                            </th>
                                            <th>Campaign</th>
                                            <th>Code</th>
                                            <th>Type</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentDiscounts.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="text-center py-8"
                                                >
                                                    <div className="flex flex-col items-center justify-center text-gray-400">
                                                        <ion-icon
                                                            name="pricetags-outline"
                                                            class="text-4xl mb-2"
                                                        ></ion-icon>
                                                        <p>
                                                            No discounts found
                                                        </p>
                                                        <Link
                                                            to={`/discounts/create/${store.id}`}
                                                            className="btn btn-primary btn-sm mt-4"
                                                        >
                                                            Create your first
                                                            discount
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            currentDiscounts.map((discount) => (
                                                <tr key={discount.id}>
                                                    <td>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                className="checkbox checkbox-primary"
                                                                checked={selectedDiscounts.includes(
                                                                    discount.id
                                                                )}
                                                                onChange={() =>
                                                                    toggleDiscountSelection(
                                                                        discount.id
                                                                    )
                                                                }
                                                            />
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <div className="font-medium">
                                                            {
                                                                discount.campaign_name
                                                            }
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {formatDate(
                                                                discount.created_at
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="badge badge-outline truncate max-w-[120px]">
                                                            {
                                                                discount.campaign_code
                                                            }
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="badge badge-ghost">
                                                            {
                                                                discount.campaign_type
                                                            }
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span
                                                            className={`badge ${
                                                                discount.status
                                                                    ? "badge-success"
                                                                    : "badge-error"
                                                            }`}
                                                        >
                                                            {discount.status ? (
                                                                <span className="flex items-center">
                                                                    <ion-icon
                                                                        name="checkmark-circle"
                                                                        class="mr-1"
                                                                    ></ion-icon>
                                                                    Active
                                                                </span>
                                                            ) : (
                                                                <span className="flex items-center">
                                                                    <ion-icon
                                                                        name="close-circle"
                                                                        class="mr-1"
                                                                    ></ion-icon>
                                                                    Inactive
                                                                </span>
                                                            )}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="flex gap-1">
                                                            <Link
                                                                to={`/discounts/edit/${discount.id}`}
                                                                className="btn btn-xs btn-warning"
                                                            >
                                                                <ion-icon name="create-outline"></ion-icon>
                                                            </Link>
                                                            <button
                                                                className="btn btn-xs btn-error"
                                                                onClick={() =>
                                                                    deleteDiscount(
                                                                        discount.id
                                                                    )
                                                                }
                                                            >
                                                                <ion-icon name="trash-outline"></ion-icon>
                                                            </button>
                                                            {/* <button 
                                                                className="btn btn-xs btn-info"
                                                                onClick={() => toggleExpand(discount.id)}
                                                            >
                                                                <ion-icon name="information-circle-outline"></ion-icon>
                                                            </button> */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination Controls */}
                            {store.discounts.length > discountsPerPage && (
                                <div className="flex justify-center mt-4">
                                    <div className="join">
                                        <button
                                            className="join-item btn btn-sm"
                                            onClick={() =>
                                                paginate(
                                                    currentPage > 1
                                                        ? currentPage - 1
                                                        : 1
                                                )
                                            }
                                            disabled={currentPage === 1}
                                        >
                                            <ion-icon name="chevron-back-outline"></ion-icon>
                                        </button>

                                        {Array.from(
                                            { length: totalPages },
                                            (_, i) => i + 1
                                        ).map((number) => (
                                            <button
                                                key={number}
                                                onClick={() => paginate(number)}
                                                className={`join-item btn btn-sm ${
                                                    currentPage === number
                                                        ? "btn-active"
                                                        : ""
                                                }`}
                                            >
                                                {number}
                                            </button>
                                        ))}

                                        <button
                                            className="join-item btn btn-sm"
                                            onClick={() =>
                                                paginate(
                                                    currentPage < totalPages
                                                        ? currentPage + 1
                                                        : totalPages
                                                )
                                            }
                                            disabled={
                                                currentPage === totalPages
                                            }
                                        >
                                            <ion-icon name="chevron-forward-outline"></ion-icon>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoreDetails;
