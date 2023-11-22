import { getPersonalDocuments, getCargoDocuments, getTruckDocuments } from "../utilities/utils";
import { useState, useEffect } from "react";

interface PersonalDocument {
  id: number;
  reference_number: string;
  issue_date: string;
  expiry_date: string;
  document_image: string;
  document_type: string;
  is_verified: boolean;
}

interface CargoDocument {
  id: number;
  reference_number: string;
  issue_date: string;
  expiry_date: string;
  document_image: string;
  document_type: string;
  cargo: string;
  cargo_tones: string;
  driver: number;
}

interface TruckDocument {
  id: number;
  reference_number: string;
  issue_date: string;
  expiry_date: string;
  document_image: string;
  document_type: string;
  driver: number;
}

const useGetDocuments = (slug:number) => {
  const [personal, setPersonalDocuments] = useState<PersonalDocument[]>([]);
  const [cargo, setCargoDocuments] = useState<CargoDocument[]>([]);
  const [truck, setTruckDocuments] = useState<TruckDocument[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof window) {
            let slugId = window.sessionStorage.getItem('id');
       
          const personal = await getPersonalDocuments(Number(slugId));
          setPersonalDocuments(personal);
          console.log(personal);
          

        // Fetch cargo documents (replace with your actual function)
        const cargo = await getCargoDocuments(Number(slugId));
        setCargoDocuments(cargo);
        console.log(personal);

        // Fetch truck documents (replace with your actual function)
        const truck = await getTruckDocuments(Number(slugId));
        setTruckDocuments(truck);
        }
       
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);

  return { personal, cargo, truck};
};

export default useGetDocuments;
