import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async () => {
        setError("");
        try {
            const res = await axios.post(
                BASE_URL + "/signup",
                { firstName, lastName, emailId, password },
                { withCredentials: true }
            );
            dispatch(addUser(res.data.data));
            navigate("/home");
        } catch (err) {
            setError(err.response?.data || "Something went wrong");
        }
    };

    return (
        <div className="flex justify-center items-center py-8 px-4 bg-base-200" style={{ minHeight: 'calc(100vh - 140px)' }}>
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center text-2xl font-bold mb-4">Create Account</h2>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">First Name</span>
                        </label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="John"
                        />
                    </div>

                    <div className="form-control w-full mt-2">
                        <label className="label">
                            <span className="label-text">Last Name</span>
                        </label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Doe"
                        />
                    </div>

                    <div className="form-control w-full mt-2">
                        <label className="label">
                            <span className="label-text">Email ID</span>
                        </label>
                        <input
                            type="email"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div className="form-control w-full mt-2">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Strong password"
                        />
                        <label className="label">
                            <span className="label-text-alt text-xs">
                                Must include uppercase, lowercase, number & special character
                            </span>
                        </label>
                    </div>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    <div className="card-actions justify-center mt-4">
                        <button className="btn btn-primary w-full" onClick={handleSignup}>
                            Sign Up
                        </button>
                    </div>

                    <div className="divider">OR</div>

                    <p className="text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="link link-primary font-semibold">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
