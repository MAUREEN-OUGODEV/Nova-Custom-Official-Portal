'use client'
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import cookie from 'cookiejs';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const userLoggedIn = Boolean(cookie.get('sessionToken'));
    setLoading(false);
    if (userLoggedIn) {
      setIsUserLoggedIn(userLoggedIn);
      setTimeout(() => {
        router.push('/uploadedDocuments');
      }, 2000)
    } else
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    
  }, [router]);

  return (
    <header id="header" className="relative">
<div className="intro flex flex-col items-start justify-center text-left bg-cover bg-center bg-no-repeat bg-fixed h-screen mb-16 bg-[url(/image/transit.png)]" >
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="pl-20">
                <h1 className="headers">
                  <span className="text-white text-[64px] font-extrabold font-['Inter']">WELCOME</span>
                </h1>
                <h3 className="text-white text-[64px] font-extrabold font-['Inter'] mb-9">
                  <span className="text-amber-600 text-[64px] font-extrabold font-['Inter']  ">to</span> Custom Officials
                </h3>
                <h2 className="text-amber-600 text-5xl font-extrabold font-['Inter'] mb-4">Making your journey</h2>
                <h2 className="text-amber-600 text-5xl font-extrabold font-['Inter'] mb-51">Smooth and fast</h2>
              </div>
          
              <hr className="border-t-2 border-amber-600 mt-10 w-17 ml-20" />
              
              <div className="flex items-center pl-20" >
              <Link href="/registration">
  <button className="w-[180.99px] h-[65px] bg-amber-600 rounded-xl mr-12 mt-10 text-2xl font-bold font-['Inter'] text-white">Signup</button>
</Link>
          
      <Link href="/logins">
  <button className="w-[157.12px] h-[65px] bg-amber-600 rounded-xl mt-12 text-2xl font-bold font-['Inter'] text-white">Login</button>
</Link>
              </div>
              <div className="social-icons mt-4 flex justify-center pr-32">
                <FaFacebook className="text-amber-600 text-2xl mx-2 mr-8" />
                <FaInstagram className="text-amber-600 text-2xl mx-2 mr-8" />
                <FaLinkedin className="text-amber-600 text-2xl mx-2 mr-8" />
            
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingPage;