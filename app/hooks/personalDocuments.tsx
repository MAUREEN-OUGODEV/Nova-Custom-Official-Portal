import { getPersonalDocuments } from "@/app/utilities/utils";
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

const useGetPersonalDocument = (slug:number) => {
  const [personal, setPersonal] = useState<PersonalDocument[]>([]);

  useEffect(() => {
    const fetchData = async () => {

      try {
        if (typeof window) {
          let slugId = window.sessionStorage.getItem('id');
     
        const documents = await getPersonalDocuments(Number(slugId));
        setPersonal(documents);
        console.log(documents);
        }
      } catch (error) {
        console.error("Error fetching personal documents:", error);
      }
    };

    fetchData();
  }, []);

  return { personal };
}

export default useGetPersonalDocument;
