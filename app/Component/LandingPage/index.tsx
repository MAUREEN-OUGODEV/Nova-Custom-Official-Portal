import React from "react";
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const LandingPage= () => {
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