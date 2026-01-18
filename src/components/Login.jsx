import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("soniyalakade@gmail.com");
  const [password, setPassword] = useState("Soniya@2004");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL+"/login",
        { emailId, password },
        { withCredentials: true }
      );


      dispatch(addUser(res.data.user));

      return navigate("/"); 
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>

          <div>
            <h3 className="mt-4 mb-3">Enter Email Id</h3>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="mail@site.com"
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <h3 className="mt-4 mb-2">Enter Password</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="input input-bordered w-full"
            />
          </div>

          <p className="text-red-500">{error}</p>
          <div className="mt-6">
            <button
              className="btn btn-primary w-full"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
