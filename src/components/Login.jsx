import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const[firstName, setFirstName] = useState("");
  const[lastName, setLastName] =useState("");
  const[isLoginForm, setIsLoginForm] = useState(true);
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

const handleSignUp = async () => {
  try {
    const res = await axios.post(
      BASE_URL + "/signup",
      {
        firstName,
        lastName,
        emailId,
        password,
      },
      { withCredentials: true }
    );

    dispatch(addUser(res.data.user || res.data));
    navigate("/profile");
  } catch (err) {
    setError(err?.response?.data || "Something went wrong");
  }
};


  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Signup"}</h2>

          <div>
            {!isLoginForm && (
              <>
                <div>
                  <h3 className="mt-4 mb-3">Enter First Name</h3>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <h3 className="mt-4 mb-3">Enter Last Name</h3>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required
                    className="input input-bordered w-full"
                  />
                </div>
              </>
            )}
            </div>

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
              onClick={isLoginForm? handleLogin : handleSignUp}
            >
              {isLoginForm? "Login":"Sign up"}
            </button>
          </div>
          <p className="flex justify-center cursor-pointer py-2" onClick={() => setIsLoginForm(value => !value)}>{isLoginForm? "New User?  Sign up here" : "Existing User? Login Here"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
