import { getDrivers } from "@/app/utilities/utils";
import { useState, useEffect } from "react";

interface driverData{
  
    id: number;
    last_name: string;
    verification_status:string;
    first_name:string;
    license_number:string;
    
   
    
}


const useGetDrivers = ()=>{
  const [drivers, setDrivers] = useState<driverData[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const fetchedDrivers = await getDrivers();
        console.log("Fetched Drivers:", fetchedDrivers); // Log the fetched data
        setDrivers(fetchedDrivers);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    })();
  }, []);
  console.log("Drivers:", drivers); // Log the stored drivers
  return { drivers };
}
export default useGetDrivers;