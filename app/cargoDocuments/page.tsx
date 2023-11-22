'use client'
import React, { useState, useEffect } from 'react';
import useGetCargoDocument from '../hooks/cargoDocuments';
import { verification } from '../utilities/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ToggleButton from '../Component/Checkbox';
import { string } from 'zod';
import SideBar from '../Component/SidebarMenu';
import Greeting from '../Component/Greetings';

const CargoDocuments = ({ driverSlug }: any) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [verifiedDocuments, setVerifiedDocuments] = useState({});
  const [slugDriver, setSlugDriver] = useState('');
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [selectedReferenceNumber, setSelectedReferenceNumber] = useState('');
  const [selectedIssueDate, setSelectedIssueDate] = useState('');
  const [selectedExpiryDate, setSelectedExpiryDate] = useState('');

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

  const searchParams = useSearchParams();
  const ids = searchParams.get('slug');
  console.log(ids);

  const { cargo } = useGetCargoDocument(Number(slugDriver));

 const handleVerificationClick = async (id) => {
    if (typeof window !== 'undefined') {
      id = window.sessionStorage.getItem('id');
      const verificationResult = await verification(id);

      if (await verificationResult === 'success') {
         setVerificationMessage('Verification succeeded.');
        setShowVerificationMessage(false);
      } else {
        setVerificationMessage('Verification succeed.');
        setShowVerificationMessage(true);
      }
    }
  };

  const confirmVerification = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/uploadedDocuments';
    }
  };

  const cancelVerification = () => {
    setShowVerificationMessage(false);
  };

  

  if (!cargo || cargo.length === 0) {
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
                <h2 className="text-center font-semibold text-nova-amber-600  text-3xl">Cargo Documents</h2>
              </div>
            </div>
            <div className='text-center ml-72 mt-8'>
             <img src="/images/custom.jpeg"
              alt="Profile"
               className='lg:w-20 mx-auto mb-4 sm:w-10 sm:mb-2'/>
               <Greeting />
               <p className='text-lg sm:text-xl text-bold'>Brian Amoti</p>
            </div>
          </div>
          <div className="text-center  mb-16 text-2xl font-bold">Cargo documents Loading ....</div>
        </div>
      </div>
    );
  }

  const c2Docs = cargo.filter((item) => item.document_type === 'c2_document');
  const t1Docs = cargo.filter((item) => item.document_type === 't1_document');
  const cargoDocs = cargo.filter((item) => item.document_type === 'cargo_declaration');

  const cargoDocuments = [
    ...c2Docs.slice(0, 1),
    ...t1Docs.slice(0, 1),
    ...cargoDocs.slice(0, 1),
  ];

  return (
    <div className='flex'>
      <SideBar />
      <div>
        <div className="grid grid-cols-3 gap-4 mt-2"></div>
        <div className="grid grid-cols- gap-4 mt-2">
          <div className="flex ml-96">
            <div>
              <h1 className="font-bold text-center mb-2 mt-4 ml-32 text-5xl">
                Custom <span className='text-amber-600'>Official</span> Portal
              </h1>
            </div>
            <div className='text-center ml-72 mt-8'>
             <img src="/images/custom.jpeg"
              alt="Profile"
               className='lg:w-20 mx-auto mb-4 sm:w-10 sm:mb-2'/>
               <Greeting />
               <p className='text-lg sm:text-xl text-bold'>Brian Amoti</p>
            </div>
          </div>
          <h2 className="text-center font-semibold text-nova-amber-600 mb-16 text-3xl">Cargo Documents</h2>
          <div className="grid grid-cols-3   gap-16 ml-16 pr-4">
            {cargoDocuments.map((item, index) => (
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
                  <p className="leading-loose text-md font-semibold">Expiry Date: {item.cargo}</p>
                  <p className="leading-loose text-md font-semibold">Type of Cargo: {item.cargo}</p>
                  <p className="leading-loose text-md font-semibold">Cargo Tonnes: {item.cargo_tones}</p>
                  <ToggleButton
                    isChecked={verifiedDocuments[item.id] || false}
                    onToggle={() => toggleDocumentVerification(item.id)}
                    onCancel={cancelVerification}  
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-24 ml-36 mb-16">
            <button className="bg-white text-nova-amber-600 border border-nova-amber-600 py-4 px-24 rounded-lg mx-4">
              Cancel
            </button>
            <button className="bg-nova-amber-600 text-white py-4 px-24 rounded-lg mx-4" onClick={handleVerificationClick}>
              Verifications
            </button>
          </div>
          {showVerificationMessage && (
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-75 z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                <p className="text-2xl">{verificationMessage}</p>
                <button onClick={cancelVerification} className="bg-white text-nova-amber-600 border border-nova-amber-600 py-2 px-6 rounded-lg mx-2 mt-4">
                  No
                </button>
                <button onClick={confirmVerification} className="bg-nova-amber-600 text-white py-2 px-6 rounded-lg mx-2 mt-4">
                  Yes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CargoDocuments;






