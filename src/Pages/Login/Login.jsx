import React, { useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import animation from '../../assets/Animation.json';
import Lottie from 'lottie-react';
import { FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { authContext } from '../../provider/Authprovider';

const Login = () => {
  const { googleSign, signIn } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then((result) => {
        Swal.fire({
          title: "Successfully Logged In",
          icon: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Login error:", error); // helpful for debugging
        Swal.fire({
          title: "Login Failed",
          text: error.message,
          icon: "error",
        });
      });
  };

  const handleGoogle = () => {
    googleSign()
      .then((res) => {
        Swal.fire({
          title: "Successfully Logged In",
          icon: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Google login error:", error);
        Swal.fire({
          title: "Login Failed",
          text: error.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] bg-white">
      <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full border border-gray-200">
        <div className="md:w-1/2 flex justify-center items-center p-8 bg-gradient-to-br from-[#eef2ff] to-[#fef9c3]">
          <Lottie animationData={animation} style={{ maxWidth: 350 }} />
        </div>

        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center mb-7 text-[#181f3a]">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#3b3b4f] text-left"
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                placeholder="Type here"
                className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 outline-none text-[#181f3a] bg-white transition"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#3b3b4f] text-left"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                required
                placeholder="Enter your password"
                className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 outline-none text-[#181f3a] bg-white transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg font-semibold text-lg bg-[#3b82f6] text-white shadow-md hover:bg-[#2563eb] transition"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-base text-[#181f3a] font-medium">
              New here?{" "}
              <Link to="/signup" className="text-[#3b82f6] hover:underline font-semibold">
                Create a New Account
              </Link>
            </p>
            <p className="mt-6 font-semibold text-base text-[#181f3a]">Or sign in with</p>
            <div className="flex justify-center mt-3">
              <button
                onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-[#3b82f6] bg-white text-[#3b82f6] font-semibold shadow hover:bg-[#3b82f6] hover:text-white transition"
              >
                <FaGoogle /> Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;