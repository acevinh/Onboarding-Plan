import React from 'react';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-base-200">
            <h1 className="text-9xl font-bold text-error">404</h1>
            <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
            <p className="text-lg mt-2 text-gray-500">
                Sorry, the page you are looking for does not exist.
            </p>
            <a href="/" className="btn btn-primary mt-6">
                Go Back Home
            </a>
        </div>
    );
};

export default NotFound;