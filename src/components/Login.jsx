import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("demo@gmail.com");
    const [password, setPassword] = useState("Demo@123456");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/login",
                { emailId, password },
                { withCredentials: true }
            );
            dispatch(addUser(res.data));
            navigate("/home");
        } catch (err) {
            setError(err.response?.data || "Something went wrong");
        }
    };

    return (
        <div className="flex justify-center items-center py-8 px-4 bg-base-200" style={{ minHeight: 'calc(100vh - 140px)' }}>
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center text-2xl font-bold mb-4">Login</h2>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email ID</span>
                        </label>
                        <input
                            type="text"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control w-full mt-4">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                    <div className="card-actions justify-center mt-6">
                        <button className="btn btn-primary w-full" onClick={handleLogin}>
                            Login
                        </button>
                    </div>

                    <div className="divider">OR</div>

                    <p className="text-center text-sm">
                        Don't have an account?{" "}
                        <Link to="/signup" className="link link-primary font-semibold">
                            Create one here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
