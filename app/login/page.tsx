'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import usePostLogin from "../hooks/userlogin";
import useLogin from "../hooks/userlogin";
import Image from "next/image";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, handleSignin } = usePostLogin({ username, password });
  const [token, setToken] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleLogin = async () => {
    handleSignin();
  };
  return (
    <>
      <div className="intro flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat bg-fixed bg-fixed bg-[url(/image/transit.png)]">

        <div className="w-[628px] h-[1200px] bg-white bg-opacity-10 backdrop-blur-[10px] mt-12 pl-24">
          <div className="flex justify-center items-center pr-32">
            <div className="mx-auto rounded-lg max-w-sm lg:w-96">
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
              <div className="mt-8 pr-6">
                <form action="#" method="POST" className="space-y-6 pr-6" >
                  <div>
                    <label
                      htmlFor="username"
                      className="block w-[98px] h-[23px] text-white text-xl font-normal font-['Inter']"
                    >
                      Username
                    </label>
                    <div className="mt-1">
                      <input
                        id="username"
                        name="username"
                        type="name"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-[416px] h-10 bg-zinc-300 rounded-[7px] mt-4 p-4 text-black p-6"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block w-[98px] h-[23px] text-white text-xl font-normal font-['Inter']"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-[416px] h-10 bg-zinc-300 rounded-[7px] mt-4 p-4 text-black p-6"
                      />
                    </div>
                  </div>
                  {user && Object.values(user)[0] && user.token ? (
                    <span className="text-amber-600">Login successful</span>
                  ) : (
                    <span className="text-amber-600">{Object.values(user)[0]}</span>
                  )}
                  <div>
                    <button
                      onClick={handleLogin}
                      type="button"
                      disabled={loading}
                      className="w-[159px] h-[63px] bg-amber-600 rounded-xl text-2xl text-white font-bold font-['Inter'] ml-24 mt-4"
                    >

                      {loading ? "Logging in..." : "Login"}
                    </button>
                    {error && (
                      <span className="text-amber-600">{error}</span>
                    )}
                    <p className={`text-white text-xl font-normal font-Inter mt-10 pl-2`}>
                      Dont have an account?<a href="/registration" className={`text-amber-600 text-xl font-normal font-Inter`}> Signup </a>
                    </p>
                    {successMessage && (
                      <div className="bg-white text-red px-4 py-2 rounded-md mt-10">
                        {successMessage}
                      </div>

                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}