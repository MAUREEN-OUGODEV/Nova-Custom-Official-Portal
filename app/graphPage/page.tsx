'use client'
import React, { useEffect, useRef } from "react";
import useGetDrivers from "../hooks/getDrivers";
import SideBar from "../Component/SidebarMenu";
import Chart from "chart.js/auto";
import Greeting from "../Component/Greetings";

function Piechart() {
  const driversData = useGetDrivers();
  const { countPendingDrivers, countVerifiedDrivers, countRejectedDrivers, countClearedDrivers } = driversData.drivers.reduce(
    (countObj, driver) => {
      if (driver.verification_status === "Pending") {
        countObj.countPendingDrivers++;
      } else if (driver.verification_status === "Verified") {
        countObj.countVerifiedDrivers++;
      } else if (driver.verification_status === "Rejected") {
        countObj.countRejectedDrivers++;
      } else if (driver.verification_status === "Cleared") {
        countObj.countClearedDrivers++;
      }
      return countObj;
    },
    { countPendingDrivers: 0, countVerifiedDrivers: 0, countRejectedDrivers: 0, countClearedDrivers: 0 }
  );

  const allDriversCount = driversData.drivers.length;

  const pendingDriversChartRef = useRef(null);
  const verifiedDriversChartRef = useRef(null);
  const rejectedDriversChartRef = useRef(null);
  const clearedDriversChartRef = useRef(null);

  useEffect(() => {
    const createOrUpdateDoughnutChart = (chartRef, chartData, count) => {
      if (chartRef.current) {
        if (chartRef.current.chartInstance) {
          chartRef.current.chartInstance.destroy();
        }
        const context = chartRef.current.getContext("2d");

        chartRef.current.chartInstance = new Chart(context, {
          type: "doughnut",
          data: chartData,
          options: {
            cutout: "70%",
            animation: {
              onComplete: (animation) => {
                const chartInstance = animation.chart;
                const ctx = chartInstance.ctx;

                ctx.font = "64px Arial";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                const centerX = chartInstance.width / 2;
                const centerY = chartInstance.height / 2;
                ctx.fillText(count, centerX, centerY);
              },
            },
          },
        });
      }
    };

    createOrUpdateDoughnutChart(pendingDriversChartRef, {
      labels: ["Pending Drivers"],
      datasets: [
        {
          data: [countPendingDrivers],
          backgroundColor: ["rgba(255, 206, 86, 0.8)"],
        },
      ],
    }, countPendingDrivers);

    createOrUpdateDoughnutChart(verifiedDriversChartRef, {
      labels: ["Verified Drivers"],
      datasets: [
        {
          data: [countVerifiedDrivers],
          backgroundColor: ["rgba(0, 128, 0, 0.8)"],
        },
      ],
    }, countVerifiedDrivers);

    createOrUpdateDoughnutChart(rejectedDriversChartRef, {
      labels: ["Rejected Drivers"],
      datasets: [
        {
          data: [countRejectedDrivers],
          backgroundColor: ["rgba(255, 0, 0, 0.8)"],
        },
      ],
    }, countRejectedDrivers);

    createOrUpdateDoughnutChart(clearedDriversChartRef, {
      labels: ["Cleared Drivers"],
      datasets: [
        {
          data: [countClearedDrivers],
          backgroundColor: ["rgba(0, 255, 0, 0.8)"],
        },
      ],
    }, countClearedDrivers);

  }, [countPendingDrivers, countVerifiedDrivers, countRejectedDrivers, countClearedDrivers]);

  return (
    <div className="overflow-y-hidden">
      <div className="flex ">
        <SideBar />
        <div>
          <div className="flex ml-96">
            <div>
              <h1 className="font-bold text-center mb-8 mt-8 ml-32 text-5xl">
                Custom <span className='text-amber-600'>Official</span> Portal
              </h1>
            </div>
            <div className='text-center ml-72 mt-8'>
              <img src="/images/custom.jpeg"
                alt="Profile"
                className='lg:w-20 mx-auto mb-4 sm:w-10 sm:mb-2' />
              <Greeting />
              <p className='text-lg sm:text-xl text-bold'>Brian Amoti</p>
            </div>
          </div>
          <div className="flex flex-wrap ml-32 mt-8">
          <div className="bg-blue-100 h-30 w-25 ml-4 mr-4 shadow-2xl pl-4 pr-4 rounded-lg mb-4 flex">
            <span className="circle mb-2 pt-16 pl-16 text-center font-bold text-4xl ">Total number of Drivers:</span>
            <div className="text-center pt-16 pl-8 pr-8 pb-4 mb-2 text-4xl  font-bold text-amber-600">{allDriversCount}</div>
          </div>
          <div className="bg-green-100 h-30 w-25 ml-4 mr-4 shadow-2xl pl-4 pr-4 rounded-lg mb-4 flex">
            <span className="circle mb-2 pt-16 pl-16 pb-16 text-center font-bold text-4xl ">Total Cleared Drivers:</span>
            <div className="text-center pt-16 pl-8 pb-16 pr-8 mb-2 text-4xl font-bold text-green-600">{countClearedDrivers}</div>
          </div>
        </div>
          <div className="grid grid-cols-3 gap-4 p-4 ml-24 mt-20"> {/* Updated to include the Cleared Drivers chart */}
            <div className="bg-blue-200 p-4 h-150 w-96 ml-4 shadow-2xl rounded-lg">
              <span className="circle mb-32 text-center ml-24 font-bold text-2xl">Pending Drivers </span>
              <canvas ref={pendingDriversChartRef}></canvas>
            </div>

            <div className="bg-green-200 p-4 h-150 w-96 ml-4 shadow-2xl rounded-lg">
              <span className="circle mb-32 text-center ml-24 font-bold text-2xl">Verified Drivers </span>
              <canvas ref={verifiedDriversChartRef}></canvas>
            </div>

            <div className="bg-red-100 p-4 h-150 w-96 ml-4 shadow-2xl rounded-lg">
              <span className="circle mb-32 text-center ml-24 font-bold text-2xl">Rejected Drivers </span>
              <canvas ref={rejectedDriversChartRef}></canvas>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Piechart;
















