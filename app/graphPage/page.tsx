'use client'
import React, { useEffect, useRef } from "react";
import useGetDrivers from "../hooks/getDrivers";
import SideBar from "../Component/SidebarMenu";
import Chart from "chart.js/auto";
import Greeting from "../Component/Greetings";

function Piechart() {
  const driversData = useGetDrivers();
  const { countPendingDrivers, countVerifiedDrivers } = driversData.drivers.reduce(
    (countObj, driver) => {
      if (driver.verification_status === "Pending") {
        countObj.countPendingDrivers++;
      } else if (driver.verification_status === "Verified") {
        countObj.countVerifiedDrivers++;
      }
      return countObj;
    },
    { countPendingDrivers: 0, countVerifiedDrivers: 0 }
  );
  
  const countAllDrivers = driversData.drivers.length;

 
  const allDriversChartRef = useRef(null);
  const pendingDriversChartRef = useRef(null);
  const verifiedDriversChartRef = useRef(null);

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

    
    createOrUpdateDoughnutChart(allDriversChartRef, {
      labels: [],
      datasets: [
        {
          data: [countAllDrivers],
          backgroundColor: ['rgba(255, 206, 86, 0.8)'],
    }],
      },
     countAllDrivers);

  
    createOrUpdateDoughnutChart(pendingDriversChartRef, {
      labels: [],
      datasets: [
        {
          data: [countPendingDrivers],
          backgroundColor: ["rgba(54, 162, 235, 0.8)"],
    }],
      },
     countPendingDrivers);

   
    createOrUpdateDoughnutChart(verifiedDriversChartRef, {
      labels: [],
      datasets: [
        {
          data: [countVerifiedDrivers],
          backgroundColor: ["rgba(255, 87, 51, 0.8)"],
    }],
      },
    countVerifiedDrivers);
  }, [countAllDrivers, countPendingDrivers, countVerifiedDrivers]);

  return (
    <div className="overflow-y-hidden">
      <div className="flex ">
      
        <SideBar  />
        <div > 
          
          <div className="flex ml-96">
            <div>
            <h1 className="font-bold text-center mb-8 mt-8 ml-32 text-5xl">
              Custom <span className='text-amber-600'>Official</span> Portal
             </h1>
            </div>
           <div className='text-center ml-72 mt-8'>
             <img src="/images/profile.png"
              alt="Profile"
               className='lg:w-20 mx-auto mb-4 sm:w-10 sm:mb-2'/>
               <Greeting />
               <p className='text-lg sm:text-xl text-bold'>Brian Amoti</p>
            </div>
      
    </div>
          <div className="grid grid-cols-3 gap-4 p-4 ml-24 mt-20">
            <div className="bg-blue-100 p-4 h-150 w-96 ml-4 shadow-2xl rounded-lg">
            <span className="circle mb-32 text-center ml-24 font-bold text-2xl">All Drivers </span>
              <canvas ref={allDriversChartRef}></canvas>
             
            </div>

            <div className="bg-green-100 p-4 h-150 w-96 ml-4 shadow-2xl rounded-lg">
            <span className="circle mb-32 text-center ml-24 font-bold text-2xl">Pending Drivers </span>
              <canvas ref={pendingDriversChartRef}></canvas>
              
            </div>
            <div className="bg-yellow-100 p-4 h-200  w-96 ml-4 shadow-2xl rounded-lg">
            <span className="circle mb-64 text-center ml-24 font-bold text-2xl">Verified Drivers </span>
              <canvas ref={verifiedDriversChartRef}></canvas>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Piechart;












