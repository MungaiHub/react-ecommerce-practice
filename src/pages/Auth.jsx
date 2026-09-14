
import { useState,useContext } from 'react'
import { useForm} from "react-hook-form";
import {AuthContext} from "../context/AuthProvider.jsx";
import {useNavigate} from "react-router-dom";

export default function Auth() {  
    const [mode, setMode] = useState("signup");
    
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const { signUp, login } = useContext(AuthContext);
    const { register, handleSubmit ,formState: {errors}} = useForm();

    function onSubmit(data){
        setError(null);
        let result;
        if (mode === "signup") {
            result = signUp(data.email, data.password);
        } else {
            result = login(data.email, data.password);
        }
        if(result.success){
          navigate("/");
        } else {
            setError(result.error);
        }
       
    }
    return (
        <div className="page">
            <div className="cointainer">
                <div className="auth-container">
                
                    <h1 className="page-title">{mode === "signup" ? "Sign Up" : "Log In"}</h1>
                    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                        {error && <div className="error-message">{error}</div>}
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input type="email" placeholder="Enter your email" className="form-input" id="email" {...register("email", {required: "Email is required"})} />
                            {errors.email && <span className="form-error">{errors.email.message}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input type="password" placeholder="Enter your password" className="form-input" id="password" {...register("password", {required: "Password is required",
                                minLength: {value: 6, message: "Password must be at least 6 characters long"},
                                maxLength: {value: 12, message: "Password must be at most 12 characters long"},
                            })} />
                            {errors.password && <span className="form-error">{errors.password.message}</span>}
                        </div>

                        <button type="submit" className="btn btn-primary btn-large">{mode === "signup" ? "Sign Up" : "Log In"}</button>
                   </form>
                   <div className="auth-switch">
                    {mode === "signup" ? (
                        <p> Already have an account? <span className="auth-link" onClick={() => setMode("login")}>Log in</span> </p>
                    ) : (
                        <p> Don't have an account? <span className="auth-link" onClick={() => setMode("signup")}>Sign up</span> </p>
                    )}

                   </div>
                </div>
            </div>
             </div>
    )
} 