import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { updateProfile } from 'firebase/auth';
import { authContext } from '../../provider/Authprovider';
import ani from '../../assets/Animation - 1736907629598.json';
import Lottie from 'lottie-react';
import { FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const SignUp = () => {
  const navigate = useNavigate();
  const { googleSign } = useContext(authContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser } = useContext(authContext);

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;

        updateProfile(loggedUser, {
          displayName: data.name,
          photoURL: data.photoURL,
        })
          .then(() => {
            Swal.fire({
              title: 'Signup Successful!',
              text: 'Welcome to Bistro Boss!',
              icon: 'success',
              draggable: true,
            });
            navigate('/');
          })
          .catch((error) => {
            console.error('Profile Update Error:', error);
            Swal.fire({
              title: 'Profile Update Failed!',
              text: error.message,
              icon: 'error',
              draggable: true,
            });
          });
      })
      .catch((error) => {
        console.error('Signup Error:', error);
        Swal.fire({
          title: 'Signup Failed!',
          text: error.message,
          icon: 'error',
          draggable: true,
        });
      });
  };

  const handleGoogle = () => {
    googleSign()
      .then((res) => {
        Swal.fire({
          title: 'Signup Successful with Google!',
          icon: 'success',
        });
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          title: 'Signup Failed with Google!',
          text: error.message,
          icon: 'error',
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-[97vh] bg-white">
     <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden max-w-6xl w-[98vw] border border-gray-200">
        <div className="md:w-1/2 flex justify-center items-center p-8 bg-gradient-to-br from-[#eef2ff] to-[#fef9c3]">
          <Lottie animationData={ani} style={{ maxWidth: 350 }} />
        </div>

        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-[#181f3a]">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#3b3b4f] text-left"
              >
                Full Name
              </label>
              <input
                {...register('name', { required: true })}
                name="name"
                type="text"
                id="name"
                placeholder="Enter your full name"
                className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 outline-none text-[#181f3a] bg-white transition"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">Name is required</span>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#3b3b4f] text-left"
              >
                Email
              </label>
              <input
                {...register('email', { required: true })}
                name="email"
                type="email"
                id="email"
                placeholder="Type your email"
                className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 outline-none text-[#181f3a] bg-white transition"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Email is required</span>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#3b3b4f] text-left"
              >
                Password
              </label>
              <input
                {...register('password', {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
                name="password"
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 outline-none text-[#181f3a] bg-white transition"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">Password is required</span>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium text-[#3b3b4f] text-left"
              >
                Photo URL
              </label>
              <input
                {...register('photoURL', { required: true })}
                name="photoURL"
                type="text"
                id="photoURL"
                placeholder="Enter a photo URL"
                className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 outline-none text-[#181f3a] bg-white transition"
              />
              {errors.photoURL && (
                <span className="text-red-500 text-sm">Photo URL is required</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg font-semibold text-lg bg-[#3b82f6] text-white shadow-md hover:bg-[#2563eb] transition"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-3">
            <p className="text-base text-[#181f3a] font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-[#3b82f6] hover:underline font-semibold">
                Login Here
              </Link>
            </p>
            <p className="mt-4 font-semibold text-base text-[#181f3a]">Or sign up with</p>
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

export default SignUp;