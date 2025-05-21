import { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';

function Register() {
const [username, setUserName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPass, setConfirmPass] = useState("");
const [errorMessage, setErrorMessage] = useState("");
const navigate = useNavigate();
const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
        setErrorMessage("Passwords do not match!");
        return;
    }
    setErrorMessage("");
    let data = { username, email, password };
    
console.log(JSON.stringify(data));
    

   let result = await fetch("http://cmsremake.test/api/register",{
    method:'POST',
    body:JSON.stringify(data),
    headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
    }
   });

   result = await result.json();
   if (result.success) {
    localStorage.setItem('user-info',JSON.stringify(result));
       navigate('/login', { state: { successMessage: result.message } });
       console.log("Registration successful:", result.message);
   } else {
       setErrorMessage(result.message || "Registration failed!");
   }

   
};

    return ( 
        <>
            {/* <Header/> */}
            <div className="bg-gray-100 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center">Register</h2>

                    <form>
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text">User  Name</span>
                            </label>
                            <input 
                            value={username}
                            onChange={(e)=>setUserName(e.target.value)}
                                type="text" 
                                name="username" 
                                className="input input-bordered w-full" 
                                placeholder="Enter your username"
                                autoComplete="new-username"
                            />
                            {/* Thêm thông báo lỗi nếu cần */}
                            <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
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
                                placeholder="Enter your email"
                                autoComplete="new-email"
                            />
                            {/* Thêm thông báo lỗi nếu cần */}
                            {/* <p className="text-red-500 text-xs mt-1">{errorMessage}</p> */}
                        </div>
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input 
                             value={password}
                             onChange={(e)=>setPassword(e.target.value)}
                                type="password" 
                                name="password" 
                                className="input input-bordered w-full" 
                                placeholder="Enter your password"
                                autoComplete="new-password"
                            />
                            {/* Thêm thông báo lỗi nếu cần */}
                            {/* <p className="text-red-500 text-xs mt-1">{errorMessage}</p> */}
                        </div>
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input 
                             value={confirmPass}
                             onChange={(e)=>setConfirmPass(e.target.value)}
                                type="password" 
                                name="password_confirmation" 
                                className="input input-bordered w-full" 
                                placeholder="Confirm your password" 
                                autoComplete="new-password"/>
                                
                            {/* Thêm thông báo lỗi nếu cần */}
                            {/* <p className="text-red-500 text-xs mt-1">{errorMessage}</p> */}
                        </div>
                        <button type="submit" className="btn btn-primary w-full" onClick={handleSubmit}>Register</button>
                    </form>
                    <div className="mt-4 text-center">
                        <p>Already have an account? 
                            <Link to="/login" className="text-blue-500 hover:underline"> Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;