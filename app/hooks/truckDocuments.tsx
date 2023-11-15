import { getTruckDocuments } from "../utilities/utils";
import { useState, useEffect } from "react";

interface TruckDocument{
  
    id: number;
    reference_number: string;
    issue_date:string;
    expiry_date:string;
    document_image:string;
    document_type:string;
    is_verified:boolean;   
}
const useGetTruck = (slug:number) => {
  const [truck, setTruck] = useState<TruckDocument[]>([]);

  useEffect(() => {
    const fetchData = async () => {

      try {
        if (typeof window) {
          let slugId = window.sessionStorage.getItem('id');
     
        const truckDocuments = await getTruckDocuments(Number(slugId));
        setTruck(truckDocuments);
        console.log(truckDocuments);
        }
      } catch (error) {
        console.error("Error fetching personal documents:", error);
      }
    };

    fetchData();
  }, []);

  return {truck}
}

export default useGetTruck;

