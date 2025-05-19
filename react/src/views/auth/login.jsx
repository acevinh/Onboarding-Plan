import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (location.state?.successMessage) {
            setSuccessMessage(location.state.successMessage);
            const timer = setTimeout(() => setSuccessMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        
        try {
            const response = await fetch("http://cmsremake.test/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Login failed');
            }

            // Store auth data
            localStorage.setItem('auth_token', result.authorization.token);
            localStorage.setItem('user_data', JSON.stringify({
                id: result.user.id,
                name: result.user.name,
                email: result.user.email,
            }));
            
            // Store token expiry
            const expiryDate = Date.now() + (result.authorization.expires_in * 1000);
            localStorage.setItem('token_expiry', expiryDate.toString());

            navigate("/dashboard");
            
        } catch (error) {
            console.error("Login Error:", error);
            setError(error.message);
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            localStorage.removeItem('token_expiry');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>

                {successMessage && (
                    <div className="alert alert-success mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{successMessage}</span>
                    </div>
                )}

                {error && (
                    <div className="alert alert-error mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            name="email"
                            className="input input-bordered w-full"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            name="password"
                            className="input input-bordered w-full"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p>
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;