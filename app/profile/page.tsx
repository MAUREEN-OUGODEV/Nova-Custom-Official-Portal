import React from "react";
import SideBar from "../Component/SidebarMenu";
const Profile = () => {
  return (
    <div className="flex">
      <SideBar />
    <div className="flex ml-72">
      <div className="w-3/4 flex flex-col justify-center items-center min-h-screen pl-4 mr-36">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-14">Welcome Brian,</h1>
          <img
            src="/images/profile.png"
            alt="profile"
            className="w-32 h-32 mx-auto rounded-full"
          />
          <p className="text-2xl font-semibold">Brian Amito</p>
          <p className="text-xl">Custom Officer</p>
        </div>
        <h2 className="text-3xl font-semibold mt-8 mb-4 text-center">
          BASIC INFORMATION
        </h2>
        <div className="flex justify-center">
          <div className="flex mt-4">
            <div>
              <div className="flex mb-2 ml-8">
                <div className="w-1/3">
                <p className="font-semibold mr-11 text-2xl text-nova-amber-600">
                    Phonenumber:
                  </p>
                </div>
                <div className="w-2/3 ml-14 text-xl">
                  <p>+254 789 454 232</p>
                </div>
              </div>
              <div className="flex mb-2 ml-8 mt-8">
                <div className="w-1/3">
                  <p className="font-semibold mr-11 text-2xl text-nova-amber-600">CustomOfficerID:</p>
                </div>
                <div className="w-2/3 ml-14">
                  <p className="w-2/3 ml-14 text-xl">Y09234</p>
                </div>
              </div>
            </div>
            <div className="border-l-2 border-orange-400 h-auto mx-4"></div>
            <div>
              <div className="flex mb-2 ml-14 ml-24">
                <div className="w-1/3">
                  <p className="font-semibold text-2xl text-nova-amber-600">EmailAddress:</p>
                </div>
                <div className="w-2/3 ml-11 text-xl">
                  <p>wangechibrian@gmail.com</p>
                </div>
              </div>
              <div className="flex mb-2 ml-24 mt-8 ">
                <div className="w-1/3">
                  <p className="font-semibold text-2xl text-nova-amber-600">Location:</p>
                </div>
                <div className="w-2/3 text-xl">
                  <p className="ml-12">Busia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
export default Profile;