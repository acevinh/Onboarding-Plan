import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function Register() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPass) {
            toast.error('Mật khẩu không khớp', {
                description: 'Vui lòng nhập lại mật khẩu giống nhau ở cả hai trường',
                duration: 5000,
            });
            return;
        }
        
        setIsLoading(true);
        const toastId = toast.loading('Đang đăng ký tài khoản...', {
            description: 'Vui lòng chờ trong giây lát'
        });
        
        try {
            let data = { username, email, password };
            let response = await fetch("http://cmsremake.test/api/register", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || "Đăng ký không thành công!");
            }

            toast.success('Đăng ký thành công!', {
                id: toastId,
                description: result.message || 'Tài khoản của bạn đã được tạo thành công',
                duration: 5000,
            });
            
            navigate('/login', { 
                state: { 
                    successMessage: result.message || 'Đăng ký thành công! Vui lòng đăng nhập' 
                } 
            });
            
        } catch (error) {
            console.error("Registration Error:", error);
            
            toast.error('Đăng ký không thành công', {
                id: toastId,
                description: error.message || 'Có lỗi xảy ra khi đăng ký tài khoản',
                duration: 5000,
                action: {
                    label: 'Thử lại',
                    onClick: () => {
                        setEmail('');
                        setPassword('');
                        setConfirmPass('');
                    },
                },
            });
        } finally {
            setIsLoading(false);
        }
    };

    return ( 
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Đăng ký tài khoản</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text">Tên người dùng</span>
                        </label>
                        <input 
                            value={username}
                            onChange={(e)=>setUserName(e.target.value)}
                            type="text" 
                            name="username" 
                            className="input input-bordered w-full" 
                            placeholder="Nhập tên người dùng"
                            autoComplete="new-username"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            type="email" 
                            name="email" 
                            className="input input-bordered w-full" 
                            placeholder="Nhập email của bạn"
                            autoComplete="new-email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text">Mật khẩu</span>
                        </label>
                        <input 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            type="password" 
                            name="password" 
                            className="input input-bordered w-full" 
                            placeholder="Nhập mật khẩu"
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text">Xác nhận mật khẩu</span>
                        </label>
                        <input 
                            value={confirmPass}
                            onChange={(e)=>setConfirmPass(e.target.value)}
                            type="password" 
                            name="password_confirmation" 
                            className="input input-bordered w-full" 
                            placeholder="Nhập lại mật khẩu" 
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p>Đã có tài khoản? 
                        <Link to="/login" className="text-blue-500 hover:underline"> Đăng nhập ngay</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;