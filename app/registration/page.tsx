'use client'
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import useCreateUsers from "../hooks/usePostUsers";
import Link from "next/link";
import router from 'next/router';

interface FormData {
  username: string;
  email_address: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  custom_id: string;
  password: string;
  confirmPassword: string;
}

const SignupPage = () => {
  const { handleRegister, user, error } = useCreateUsers();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email_address: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    custom_id: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordMatchError, setPasswordMatchError] = useState(false);


const errorMessages = Object.values(error);
const errorMessage = errorMessages.join(" ");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "confirmPassword") {
      if (formData.password !== value) {
        setPasswordMatchError(true);
      } else {
        setPasswordMatchError(false);
      }
    }
  };

  const togglePasswordVisibility = (field: string) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirm_password") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    await handleRegister(formData);
  };
  return (
    <div className="intro flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat bg-fixed bg-fixed bg-[url(/image/transit.png)]">
      <div className="w-[628px] h-[1200px] bg-white bg-opacity-10 backdrop-blur-[10px] mt-12 pl-24">
        <div className="flex justify-center items-center">
          <div className="flex flex-col lg:flex-row pr-2">
         
            <div className="pr-6">
            <div className="flex flex-col items-center mt-10">
          <div className="flex items-center justify-center mt-8 pr-20">
            <img src="/image/profile.png" alt="Profile Icon" className="w-[90px] h-[90px] rounded-full" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-white pr-20">
            <span className="text-amber-600">Log</span>in
          </h2>
          <p className="text-2xl font-semibold text-white text-black pr-20 mb-">
            Welcome to TruxPortal
          </p>
        </div>
              <form className="mt-6" onSubmit={handleSubmit}>
                <div className="mb-2">
                <label htmlFor="username" className="block w-[98px] h-[23px] text-white text-xl font-normal font-['Inter']">
            Username
          </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-[416px] h-10 bg-zinc-300 rounded-[7px] mt-4 p-4 text-black p-6"
                />
                </div>
                <div>
                <label htmlFor="email_address" className="block w-[98px] h-[23px] text-white text-xl font-normal font-['Inter']">
            EmailAddress
          </label>
                <input
                  type="email_address"
                  name="email_address"
                  placeholder="email_address"
                  value={formData.email_address}
                  onChange={handleInputChange}
                  className="w-[416px] h-10 bg-zinc-300 rounded-[7px] mt-4 p-4 text-black p-6 "
                />
                </div>
                <div>
                <label htmlFor="first_name" className="block w-[98px] h-[23px] text-white text-xl font-normal font-['Inter']">
            FirstName
          </label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="w-[416px] h-10 bg-zinc-300 rounded-[7px] mt-4 p-4 text-black p-6"
                />
                </div>
                <div>
                <label htmlFor="last_name" className="block w-[98px] h-[23px] text-white text-xl font-normal font-['Inter']">
            LastName
          </label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="w-[416px] h-10 bg-zinc-300 rounded-[7px] mt-4 p-4 text-black p-6"
                />
                </div>
                <div>
                <label htmlFor="phone_number" className="block w-[98px] h-[23px] text-white text-xl font-normal font-['Inter']">
            PhoneNumber
          </label>
                <input
                  type="text"
                  name="phone_number"
                  placeholder="Phone Number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="w-[416px] h-10 bg-zinc-300 rounded-[7px] mt-4 p-4 text-black p-6"
                />
                </div>
                <div>
                <label htmlFor="custom_id" className="block w-[98px] h-[23px] text-white text-xl font-normal font-['Inter']">
            custom_id
          </label>
                <input
                  type="text"
                  name="custom_id"
                  placeholder="Custom ID"
                  value={formData.custom_id}
                  onChange={handleInputChange}
                  className="w-[416px] h-10 bg-zinc-300 rounded-[7px] mt-4 p-4 text-black p-6"
                />
                </div>
                <div className="relative">
  <label
    htmlFor="password"
    className="block w-[98px] h-[23px] text-white text-xl font-normal font-['Inter']"
  >
    Password
  </label>
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleInputChange}
    className="w-[416px] h-10 bg-zinc-300 rounded-[7px] mt-4 p-4 text-black p-6"
  />
  <FontAwesomeIcon
    icon={showPassword ? faEye : faEyeSlash}
    className="absolute top-1/2 right-6 transform -translate-y-1/6 text-black cursor-pointer"
    onClick={() => togglePasswordVisibility("password")}
  />
</div>
                <div className="relative">
                <label htmlFor="confirmpassword" className="block w-[98px] h-[23px] text-white text-xl font-normal font-['Inter']">
            confirmPassword
          </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-[416px] h-10 bg-zinc-300 rounded-[7px] mt-4 p-4 text-black p-6 ${passwordMatchError
                      ? "border-red-500"
                      : "border-gray-300"
                    } `} 
                  />
                 <FontAwesomeIcon
  icon={showConfirmPassword ? faEye : faEyeSlash}
  className="absolute top-1/2 right-6 transform -translate-y-1/6 text-black cursor-pointer"
  onClick={() => togglePasswordVisibility("confirm_password")}
/>
                </div>
                {passwordMatchError && (
                  <div className="text-red-500 ml-16 mt-2">
                    Passwords do not match.
                  </div>
                )}
                <button
                  type="submit"
                  className="w-[159px] h-[63px] bg-amber-600 rounded-xl text-2xl text-white font-bold font-['Inter'] ml-24 mt-4"
                >
                  Sign Up
                </button>
              </form>

              {error && (
                <div className="text-red-500 ml-16 mt-2 ">{error}</div>
              )}
              {user && (
                <div className="text-red-500 ml-16 mt-2">{user.message}</div>
              )}
              <p className="text-white text-xl font-normal font-Inter pr-20 mt-10 pl-2">
                Already have an account?{" "}
                <Link href="/login" className="text-amber-600 text-xl font-normal font-Inter">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
