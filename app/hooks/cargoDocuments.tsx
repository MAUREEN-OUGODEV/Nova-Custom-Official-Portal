import { getCargoDocuments } from "../utilities/utils";
import { useState, useEffect } from "react";

interface CargoDocument{
  
    id: number;
    reference_number: string;
    issue_date:string;
    expiry_date:string;
    document_image:string;
    document_type:string;
    cargo: string,
    cargo_tones: number,
    is_verified:boolean;
    

    
   
    
}
const useGetCargoDocument = (slug:number) => {
  const [cargo, setCargo] = useState<CargoDocument[]>([]);

  useEffect(() => {
    const fetchData = async () => {

      try {
        if (typeof window) {
          let slugId = window.sessionStorage.getItem('id');
     
        const documents = await getCargoDocuments(Number(slugId));
        setCargo(documents);
        console.log(documents);
        }
      } catch (error) {
        console.error("Error fetching cargo documents:", error);
      }
    };

    fetchData();
  }, []);

  return {cargo}
}

export default useGetCargoDocument; 

