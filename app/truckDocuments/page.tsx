'use client'
import React, { useState, useEffect } from 'react';
import useGetTruck from '../hooks/truckDocuments';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import ToggleButton from '../Component/Checkbox';
import SideBar from '../Component/SidebarMenu';
import Greeting from '../Component/Greetings';
import { rejected } from '../utilities/utils';


const TruckDocuments = ({ driverSlug }: any) => {
  const [slugDriver, setSlugDriver] = useState('');
  const { truck } = useGetTruck(Number(slugDriver));
  const [verificationMessage, setVerificationMessage] = useState('');
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [verifiedDocuments, setVerifiedDocuments] = useState({});
  const [showModal, setShowModal] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();


  useEffect(() => {
    const storedId = typeof window !== 'undefined' ? window.sessionStorage.getItem('id') : '';
    setSlugDriver(storedId);
  }, []);

  const toggleDocumentVerification = (documentId) => {
    setVerifiedDocuments((prevState) => ({
      ...prevState,
      [documentId]: !prevState[documentId],
    }));
  };

  const cancelVerification = () => {
    
    setShowVerificationMessage(true);
    setVerificationMessage('');
  };
 
    const handleReject = async () => {
      const isAnyDocumentNotVerified = displayedDocuments.some((item) => !verifiedDocuments[item.id]);
    
      if (isAnyDocumentNotVerified) {
        const userConfirmed = window.confirm('Are you sure you want to cancel without verifying all documents?');
        
        if (userConfirmed) {
          try {
            
            await rejected(Number(slugDriver));
    
            
          router.push('/uploadedDocuments')
          } catch (error) {
            
            console.error('Error during rejection:', error);
          }
        } else {
         
        }
      } else {
        setShowVerificationMessage(true);
        setVerificationMessage('');
      }
    };
  const handleVerificationClick = () => {
    const isAnyDocumentNotVerified = displayedDocuments.some((item) => !verifiedDocuments[item.id]);

    if (typeof window !== 'undefined' && isAnyDocumentNotVerified) {
      setVerificationMessage('There are documents that you have not verified. Do you want to proceed?');
      setShowVerificationMessage(true);
    } else {
      router.push('/cargoDocuments');
    }
  };

  if (!truck || truck.length === 0) {
    return (
      <div className='flex'>
        <SideBar />
        <div className="grid grid-cols- gap-4 mt-2">
          <div className="flex ml-96">
            <div>
              <h1 className="font-bold text-center mb-2 mt-4 ml-32 text-5xl">
                Custom <span className='text-amber-600'>Official</span> Portal
              </h1>
              <div>
                <h2 className="text-center font-semibold text-nova-amber-600  text-3xl">Truck Documents</h2>
              </div> 
            </div>
            <div className='text-center ml-72 mt-8'>
              <img
                src="/images/custom.jpeg"
                alt="Profile"
                className='lg:w-20 mx-auto mb-4 sm:w-10 sm:mb-2'
              />
              <Greeting />
              <p className='text-lg sm:text-xl text-bold'>Brian Amoti</p>
            </div>
          </div>
          <div className="text-center  mb-16 text-2xl font-bold">Truck documents Loading....</div>
        </div>
      </div>
    );
  }

  const personalDocs = truck.filter((item) => item.document_type === 'transit goods documents');
  const insuranceDocs = truck.filter((item) => item.document_type === 'insurance');
 
  
  const displayedDocuments = [
    ...personalDocs.slice(0, 1),
    ...insuranceDocs.slice(0, 1),
    
  ];

  return (
    <div className='flex'>
      <SideBar />
      <div>
        <div className="grid grid-cols-2 ml-16 gap-4"></div>
        <div className="grid grid-cols- gap-4 mt-2">
          <div className="flex ml-96">
            <div>
              <h1 className="font-bold text-center  mt-4 ml-32 text-5xl">
                Custom <span className='text-amber-600'>Official</span> Portal
              </h1>
            </div>
            <div className='text-center ml-72 mt-8'>
              <img
                src="/images/custom.jpeg"
                alt="Profile"
                className='lg:w-20 mx-auto mb-4 sm:w-10 sm:mb-2'
              />
              <Greeting />
              <p className='text-lg sm:text-xl text-bold'>Brian Amoti</p>
            </div>
          </div>
          <h2 className="text-center font-semibold text-nova-amber-600 mb-16 text-3xl">Truck Documents</h2>
          <div className="grid grid-cols-2   gap-16 ml-16 pr-4">
            {displayedDocuments.map((item, index) => (
              <div key={index} className="flex flex-col bg-gray-100 shadow-2xl rounded ">
                <div className="cursor-pointer justify-center pl-8">
                  <a href={item.document_image} target="_blank" rel="noopener noreferrer">
                    <img
                      src={item.document_image}
                      alt={`Document ${item.id}`}
                      style={{ width: '300px', height: '300px' }}
                    />
                  </a>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-nova-amber-600 leading-10 text-2xl">
                    {item.document_type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                  </h3>
                  <p className="leading-loose text-md font-semibold">Reference NO: {item.reference_number}</p>
                  <p className="leading-loose text-md font-semibold">Issue Date: {item.issue_date}</p>
                  <p className="leading-loose text-md font-semibold">Expiry Date: {item.expiry_date}</p>
                  <ToggleButton
                    isChecked={verifiedDocuments[item.id] || false}
                    onToggle={() => toggleDocumentVerification(item.id)}
                    onCancel={cancelVerification}  
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 ml-36 mb-16">
            <button
              className="bg-white text-nova-amber-600 border border-nova-amber-600 py-4 px-24 rounded-lg mx-4" onClick={handleReject}
            >
              Cancel
            </button>
            <button
              className="bg-nova-amber-600 text-white py-4 px-24 rounded-lg mx-4"
              onClick={handleVerificationClick}
            >
              Verification
            </button>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default TruckDocuments;












