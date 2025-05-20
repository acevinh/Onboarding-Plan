import { Link } from "react-router-dom";
import useStoreIndex from "../../../hooks/store/useStoreIndex";

function StoreIndex() {
    const {
        stores,
        loading,
        error,
        selectedStore,
        showDetails,
        handleDelete,
        handleCloseDetails,
        formatDate,
    } = useStoreIndex();

    if (loading)
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );

    if (error)
        return (
            <div className="alert alert-error shadow-lg max-w-4xl mx-auto mt-8">
                <div>
                    <ion-icon
                        name="warning-outline"
                        className="text-xl"
                    ></ion-icon>
                    <span>{error}</span>
                </div>
            </div>
        );

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center gap-2">
                    <ion-icon
                        name="storefront-outline"
                        className="text-3xl text-primary"
                    ></ion-icon>
                    <h1 className="text-2xl font-bold">Store Management</h1>
                </div>
                {/* <Link to="/stores/create" className="btn btn-primary">
                    <ion-icon name="add-outline" className="mr-2"></ion-icon>
                    Add New Store
                </Link> */}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Total Stores */}
                <div className="card bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="card-body">
                        <div className="flex items-center gap-4">
                            <div
                                className="rounded-full bg-blue-500/50 p-3 flex items-center justify-center"
                                style={{
                                    height: "50px",
                                    width: "50px",
                                    minWidth: "50px",
                                }}
                            >
                                <ion-icon
                                    name="business-outline"
                                    className="text-2xl text-blue-500"
                                    style={{ paddingTop: "2px" }}
                                ></ion-icon>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700">
                                    Total Stores
                                </h2>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stores.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Stores */}
                <div className="card bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="card-body">
                        <div className="flex items-center gap-4">
                            <div
                                className="rounded-full bg-green-500/50 p-3 flex items-center justify-center"
                                style={{
                                    height: "50px",
                                    width: "50px",
                                    minWidth: "50px",
                                }}
                            >
                                <ion-icon
                                    name="checkmark-circle-outline"
                                    className="text-2xl text-green-500"
                                    style={{ paddingTop: "2px" }}
                                ></ion-icon>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700">
                                    Active Stores
                                </h2>
                                <p className="text-2xl font-bold text-gray-900">
                                    {
                                        stores.filter(
                                            (store) =>
                                                store.uninstall_date === null
                                        ).length
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Premium Plans */}
                <div className="card bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="card-body">
                        <div className="flex items-center gap-4">
                            <div
                                className="rounded-full bg-purple-500/50 p-3 flex items-center justify-center"
                                style={{
                                    height: "50px",
                                    width: "50px",
                                    minWidth: "50px",
                                }}
                            >
                                <ion-icon
                                    name="pricetag-outline"
                                    className="text-2xl text-purple-500"
                                    style={{ paddingTop: "2px" }}
                                ></ion-icon>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700">
                                    Premium Plans
                                </h2>
                                <p className="text-2xl font-bold text-gray-900">
                                    {
                                        stores.filter(
                                            (store) => store.plan === "premium"
                                        ).length
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* New This Month */}
                <div className="card bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="card-body">
                        <div className="flex items-center gap-4">
                            <div
                                className="rounded-full bg-cyan-500/50 p-3 flex items-center justify-center"
                                style={{
                                    height: "50px",
                                    width: "50px",
                                    minWidth: "50px",
                                }}
                            >
                                <ion-icon
                                    name="calendar-outline"
                                    className="text-2xl text-cyan-500"
                                    style={{ paddingTop: "2px" }}
                                ></ion-icon>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700">
                                    New This Month
                                </h2>
                                <p className="text-2xl font-bold text-gray-900">
                                    {
                                        stores.filter((store) => {
                                            const installDate = new Date(
                                                store.install_date
                                            );
                                            const now = new Date();
                                            return (
                                                installDate.getMonth() ===
                                                    now.getMonth() &&
                                                installDate.getFullYear() ===
                                                    now.getFullYear()
                                            );
                                        }).length
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stores Table */}
            <div className="card bg-base-100 shadow-lg">
                <div className="card-body p-0">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="bg-base-200">
                                    <th className="w-16">ID</th>
                                    <th>Store</th>
                                    <th>Contact</th>
                                    <th>Country</th>
                                    <th>Status</th>
                                    <th>Plan</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stores.map((store) => (
                                    <tr
                                        key={store.id}
                                        className="hover:bg-base-200/50"
                                    >
                                        <td className="font-mono text-sm">
                                            {store.id}
                                        </td>
                                        <td>
                                            <div className="font-medium">
                                                {store.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Joined:{" "}
                                                {formatDate(store.install_date)}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-sm">
                                                {store.email}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {store.phone}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="badge badge-outline">
                                                {store.country}
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                className={`badge ${
                                                    store.uninstall_date
                                                        ? "badge-error"
                                                        : "badge-success"
                                                }`}
                                            >
                                                {store.uninstall_date
                                                    ? "Inactive"
                                                    : "Active"}
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                className={`badge ${
                                                    store.plan === "premium"
                                                        ? "badge-primary"
                                                        : "badge-accent"
                                                }`}
                                            >
                                                {store.plan}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex justify-center gap-1">
                                                <Link
                                                    to={`/store-list/${store.id}`}
                                                    className="btn btn-ghost btn-sm text-info"
                                                    title="View Details"
                                                >
                                                    <ion-icon
                                                        name="eye-outline"
                                                        className="text-lg"
                                                    ></ion-icon>
                                                </Link>
                                                {/* <Link 
                                                    to={`/stores/edit/${store.id}`}
                                                    className="btn btn-ghost btn-sm text-warning"
                                                    title="Edit"
                                                >
                                                    <ion-icon name="create-outline" className="text-lg"></ion-icon>
                                                </Link> */}
                                                <button
                                                    onClick={() =>
                                                        handleDelete(store.id)
                                                    }
                                                    className="btn btn-ghost btn-sm text-error"
                                                    title="Delete"
                                                >
                                                    <ion-icon
                                                        name="trash-outline"
                                                        className="text-lg"
                                                    ></ion-icon>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Empty State */}
            {stores.length === 0 && !loading && (
                <div className="card bg-base-100 shadow-lg mt-8">
                    <div className="card-body items-center text-center py-16">
                        <ion-icon
                            name="storefront-outline"
                            className="text-5xl text-gray-400 mb-4"
                        ></ion-icon>
                        <h2 className="text-xl font-semibold">
                            No Stores Found
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Get started by adding your first store
                        </p>
                        <Link to="/stores/create" className="btn btn-primary">
                            <ion-icon
                                name="add-outline"
                                className="mr-2"
                            ></ion-icon>
                            Add New Store
                        </Link>
                    </div>
                </div>
            )}

            {/* Details Modal */}
            {showDetails && selectedStore && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-5xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-xl flex items-center gap-2">
                                <ion-icon name="storefront-outline"></ion-icon>
                                {selectedStore.name}
                            </h3>
                            <button
                                onClick={handleCloseDetails}
                                className="btn btn-circle btn-ghost"
                            >
                                <ion-icon
                                    name="close-outline"
                                    className="text-xl"
                                ></ion-icon>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="card bg-base-100 border border-base-300">
                                <div className="card-body">
                                    <h4 className="card-title text-lg font-semibold mb-4">
                                        <ion-icon
                                            name="information-circle-outline"
                                            className="mr-2"
                                        ></ion-icon>
                                        Store Information
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-gray-500">
                                                Store ID
                                            </span>
                                            <span className="font-mono">
                                                {selectedStore.id}
                                            </span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-gray-500">
                                                Email
                                            </span>
                                            <span>{selectedStore.email}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-gray-500">
                                                Phone
                                            </span>
                                            <span>{selectedStore.phone}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-gray-500">
                                                Country
                                            </span>
                                            <span className="badge badge-outline">
                                                {selectedStore.country}
                                            </span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-gray-500">
                                                Install Date
                                            </span>
                                            <span>
                                                {formatDate(
                                                    selectedStore.install_date
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-gray-500">
                                                Uninstall Date
                                            </span>
                                            <span>
                                                {formatDate(
                                                    selectedStore.uninstall_date
                                                ) || "N/A"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Plan
                                            </span>
                                            <span
                                                className={`badge ${
                                                    selectedStore.plan ===
                                                    "premium"
                                                        ? "badge-primary"
                                                        : "badge-accent"
                                                }`}
                                            >
                                                {selectedStore.plan}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-base-100 border border-base-300">
                                <div className="card-body">
                                    <h4 className="card-title text-lg font-semibold mb-4">
                                        <ion-icon
                                            name="pricetags-outline"
                                            className="mr-2"
                                        ></ion-icon>
                                        Discount Campaigns (
                                        {selectedStore.discounts.length})
                                    </h4>
                                    {selectedStore.discounts.length > 0 ? (
                                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                                            {selectedStore.discounts.map(
                                                (discount) => (
                                                    <div
                                                        key={discount.id}
                                                        className="card bg-base-200 shadow"
                                                    >
                                                        <div className="card-body p-4">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <h5 className="font-medium">
                                                                        {
                                                                            discount.campaign_name
                                                                        }
                                                                    </h5>
                                                                    <div className="flex items-center gap-2 mt-1">
                                                                        <span className="badge font-mono">
                                                                            {
                                                                                discount.campaign_code
                                                                            }
                                                                        </span>
                                                                        <span className="badge badge-ghost">
                                                                            {
                                                                                discount.campaign_type
                                                                            }
                                                                        </span>
                                                                        <span
                                                                            className={`badge ${
                                                                                discount.status ===
                                                                                1
                                                                                    ? "badge-success"
                                                                                    : "badge-error"
                                                                            }`}
                                                                        >
                                                                            {discount.status ===
                                                                            1
                                                                                ? "Active"
                                                                                : "Inactive"}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <Link
                                                                    to={`/discounts/edit/${discount.id}`}
                                                                    className="btn btn-ghost btn-sm"
                                                                >
                                                                    <ion-icon name="create-outline"></ion-icon>
                                                                </Link>
                                                            </div>

                                                            {discount
                                                                .discount_rules
                                                                .length > 0 && (
                                                                <div className="mt-3">
                                                                    <div className="divider my-1"></div>
                                                                    <h6 className="text-sm font-semibold mb-2">
                                                                        Discount
                                                                        Rules
                                                                    </h6>
                                                                    <ul className="space-y-2">
                                                                        {discount.discount_rules.map(
                                                                            (
                                                                                rule
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        rule.rule_id
                                                                                    }
                                                                                    className="text-sm"
                                                                                >
                                                                                    <div className="flex justify-between">
                                                                                        <span>
                                                                                            From{" "}
                                                                                            {
                                                                                                rule.buy_from
                                                                                            }{" "}
                                                                                            to{" "}
                                                                                            {
                                                                                                rule.buy_to
                                                                                            }
                                                                                        </span>
                                                                                        <span className="font-medium">
                                                                                            {
                                                                                                rule.discount_value
                                                                                            }
                                                                                            %{" "}
                                                                                            {
                                                                                                rule.discount_type
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                </li>
                                                                            )
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-400">
                                            <ion-icon
                                                name="pricetags-outline"
                                                className="text-3xl mb-2"
                                            ></ion-icon>
                                            <p>No discount campaigns found</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="modal-action">
                            <button
                                className="btn"
                                onClick={handleCloseDetails}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StoreIndex;
