import {  useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Login() {
    // const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const toastId = toast.loading('Đang đăng nhập...', {
            description: 'Vui lòng chờ trong giây lát'
        });
        
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
                throw new Error(result.message || 'Đăng nhập không thành công');
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

            toast.success('Đăng nhập thành công!', {
                id: toastId,
                description: `Chào mừng ${result.user.email} trở lại`,
                duration: 3000,
                action: {
                    label: 'OK',
                    onClick: () => console.log('Toast closed'),
                },
            });
            
            navigate("/dashboard");
            
        } catch (error) {
            console.error("Login Error:", error);
            
            toast.error('Đăng nhập thất bại', {
                id: toastId,
                description: error.message || 'Email hoặc mật khẩu không đúng',
                duration: 5000,
                action: {
                    label: 'Thử lại',
                    onClick: () => {
                        setEmail('');
                        setPassword('');
                    },
                },
            });
            
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
                <h2 className="text-2xl font-bold text-center">Đăng nhập</h2>

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
                            placeholder="Nhập email của bạn"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text">Mật khẩu</span>
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            name="password"
                            className="input input-bordered w-full"
                            placeholder="Nhập mật khẩu"
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p>
                        Chưa có tài khoản?{" "}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;