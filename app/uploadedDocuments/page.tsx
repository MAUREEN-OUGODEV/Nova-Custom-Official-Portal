'use client'

import React, { useState, useEffect } from "react";
import useGetDrivers from "../hooks/getDrivers";
import Link from "next/link";
import Search from "../components/search";
import { useRouter } from 'next/navigation';
import SideBar from "../Component/SidebarMenu";

function Pending() {
  const driversData = useGetDrivers();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const driversPerPage = 10;
  const [filterType, setFilterType] = useState("All");
  const router = useRouter();
  const handlePageChange = (page) => {
    setActivePage(page);
  };

  // Count the pending, verified, and all drivers
  const countPendingDrivers = Array.isArray(driversData.drivers)
    ? driversData.drivers.filter(
        (driver) => driver.verification_status === "Pending"
      ).length
    : 0;

  const countVerifiedDrivers = Array.isArray(driversData.drivers)
    ? driversData.drivers.filter(
        (driver) => driver.verification_status === "Verified"
      ).length
    : 0;

  const countAllDrivers = Array.isArray(driversData.drivers)
    ? driversData.drivers.length
    : 0;

  const startIndex = (activePage - 1) * driversPerPage;
  const endIndex = startIndex + driversPerPage;

  const filteredDrivers = Array.isArray(driversData.drivers)
  ? driversData.drivers
      .filter((driver) => {
        if (filterType === "All") {
          return driver.first_name.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (filterType === "Pending") {
          return (
            driver.first_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            driver.verification_status === "Pending"
          );
        } else if (filterType === "Verified") {
          return (
            driver.first_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            driver.verification_status === "Verified"
          );
        }
      })
      .sort((a, b) => b.id - a.id) 
  : [];




  const driversToDisplay = filteredDrivers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredDrivers.length / driversPerPage);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setActivePage(1);
  };

  const handleFilter = (filter) => {
    setFilterType(filter);
    setActivePage(1);
  };

  const handleDriverClick = (item) => {
    if (item.verification_status === "Pending") {
      if (typeof window) {
        window.sessionStorage.setItem('id', `${item.id}`);
        window.location.href = "/personalDocuments";
      }
    } else if (item.verification_status === "Verified") {
      router.push('/approved');
      setTimeout(() => {
        router.push('/uploadedDocuments');
      }, 3000);
    }
  };

  return (
    <div className="flex">
      <div className="">
        <SideBar />
      </div>
      <div className="flex-1">
        <Search onSearch={handleSearch} />
        <div className="min-h-screen p-8">
          <div className="grid grid-cols-3 gap-2 mb-4 ml-16">
            <div
              className={`filter-option ${filterType === "All" ? "active" : ""} cursor-pointer font-semibold text-3xl  ${
                filterType === "All" ? "text-amber-600" : "text-gray-700"
              }`}
              onClick={() => handleFilter("All")}
            >
              All
            </div>
            <div
              className={`filter-option ${filterType === "Pending" ? "active" : ""} cursor-pointer font-semibold text-3xl  ${
                filterType === "Pending" ? "text-amber-600" : "text-gray-700"
              }`}
              onClick={() => handleFilter("Pending")}
            >
              Pending
            </div>
            <div
              className={`filter-option ${filterType === "Verified" ? "active" : ""} cursor-pointer font-semibold text-3xl  ${
                filterType === "Verified" ? "text-amber-600" : "text-gray-700"
              }`}
              onClick={() => handleFilter("Verified")}
            >
              Verified
            </div>
          </div>
          <div className="verification">
            <div className="table w-full ">
              <table className="w-full table-fixed  ml-8">
                <thead className="text-2xl">
                  <tr>
                    <th className="border-b p-8 text-left">Name</th>
                    <th className="border-b p-4 text-left">License Number</th>
                    <th className="border-b p-4 text-left">Verification Status</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {driversToDisplay.map((item) => (
                    <tr key={item.id}>
                      <td className="border-b p-3 text-left">
                        <p className="cursor-pointer" onClick={() => handleDriverClick(item)}>
                          {item.first_name} {item.last_name}
                        </p>
                      </td>
                      <td className="border-b p-3 text-left">{item.license_number}</td>
                      <td className="border-b p-3 pl-16 text-left">
                        <div className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded-full mr-2 ${
                              item.verification_status === "Verified"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></div>
                          {item.verification_status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="pagination mt-4 flex items-center justify-center">
            <span className="mr-2 text-gray-600">
              Page {activePage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(activePage - 1)}
              disabled={activePage === 1}
              className="px-3 py-1 bg-green-800 text-white rounded-full hover-bg-green-800 disabled-bg-gray-400 disabled-cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(activePage + 1)}
              disabled={activePage === totalPages}
              className="px-3 py-1 bg-green-800 text-white rounded-full hover-bg-green-800 disabled-bg-gray-400 disabled-cursor-not-allowed ml-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pending;

