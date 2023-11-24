'use client'
import React, { useState } from 'react';
import SideBar from '../Component/SidebarMenu';
import Greeting from '../Component/Greetings';
import useGetDocuments from '../hooks/summary';
import { useRouter } from 'next/navigation'; // Correct the import statement
import { cleared, rejectedVerify} from '../utilities/utils';
import ClearButton from '../Component/Clear';

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => (
  <div className={`modal ${isOpen ? 'open' : 'closed'}`}>
    <div className="modal-content">
      <p>{message}</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  </div>
);


const Home = ({ driverSlug }: any) => {
  const [slugDriver, setSlugDriver] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(() => () => {});
  const router = useRouter();
  const { personal, cargo, truck } = useGetDocuments(Number(slugDriver));
  const [showPersonalVerification, setShowPersonalVerification] = useState(false);
  const [showCargoVerification, setShowCargoVerification] = useState(false);
  const [showTruckVerification, setShowTruckVerification] = useState(false);

  // Dummy handler function for the ClearButton
  const handleClearButtonPersonal = () => {
    
    setShowPersonalVerification((prevValue) => !prevValue);
  };
  const handleClearButtonCargo = () => {
    
    setShowCargoVerification((prevValue) => !prevValue);
  };
  const handleClearButtonToggle = () => {
    
    setShowTruckVerification((prevValue) => !prevValue);
  };

  
  const personalDocs = personal.filter((item) => item.document_type === 'passport');
  const healthCertificateDocs = personal.filter((item) => item.document_type === 'health_certificate');
  const drivingLicenseDocs = personal.filter((item) => item.document_type === 'driving_license');

  const displayedDocuments = [
    ...personalDocs.slice(0, 1),
    ...healthCertificateDocs.slice(0, 1),
    ...drivingLicenseDocs.slice(0, 1),
  ];

  // Extracting documents for Cargo
  const c2Docs = cargo.filter((item) => item.document_type === 'c2_document');
  const t1Docs = cargo.filter((item) => item.document_type === 't1_document');
  const cargoDocs = cargo.filter((item) => item.document_type === 'cargo_declaration');

  const cargoDocuments = [
    ...c2Docs.slice(0, 1),
    ...t1Docs.slice(0, 1),
    ...cargoDocs.slice(0, 1),
  ];

  const truckDocs = truck.filter((item) => item.document_type === 'transit goods documents');
  const insuranceDocs = truck.filter((item) => item.document_type === 'insurance');

  const truckDocuments = [
    ...truckDocs.slice(0, 1),
    ...insuranceDocs.slice(0, 1),
  ];

  const handleCancelAction = async () => {
    setConfirmationAction(async () => {
      try {
        const result = await rejectedVerify(Number(window.sessionStorage.getItem('id')));
        console.log(result);
        router.push('/uploadedDocuments');
      } catch (error) {
        console.error('Error rejecting driver:', error.message);
      }
    });
    setIsConfirmationOpen(true);
  };

  const handleVerificationClear = async () => {
    setConfirmationAction(async () => {
      try {
        const result = await cleared(Number(window.sessionStorage.getItem('id')));
        console.log(result);
        router.push('/uploadedDocuments');
      } catch (error) {
        console.error('Error clearing verification:', error.message);
      }
    });
    setIsConfirmationOpen(true);
  };

  const confirmAction = async () => {
    await confirmationAction();
    setIsConfirmationOpen(false);
  };

  const cancelConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  return (
    <div>
      <div className="flex">
        <SideBar />
        <div>
          <div className="gap-4">
            <div className="flex ml-96">
              <div>
                <h1 className="font-bold text-center mt-2 text-center mb-3 text-5xl">
                  Custom <span className="text-amber-600">Official</span> Portal
                </h1>
                <div>
                  <h2 className="text-center font-semibold text-nova-amber-600 text-3xl">
                    Documents Summary
                  </h2>
                </div>
              </div>
              <div className="text-center ml-72 mt-2">
                <img
                  src="/images/custom.jpeg"
                  alt="Profile"
                  className="lg:w-20 mx-auto mb-4 sm:w-10 sm:mb-2"
                />
                <Greeting />
                <p className="text-lg sm:text-xl text-bold">Brian Amoti</p>
              </div>
            </div>
          </div>
          <div className="flex justify-around p-8 mt-2 ml-16">
            <div className="bg-blue-200 p-4 rounded-md shadow-md">
              <h1 className="leading-loose text-md font-semibold text-3xl text-center">Personal Documents</h1>
              <div className=" " >
                {displayedDocuments.map((item, index) => (
                  <div key={index} className=" ">
                    <div className="text-left">
                      <h3 className="font-semibold text-nova-amber-600 leading-10 text-xl">
                        {item.document_type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (char) =>
                          char.toUpperCase()
                        )}
                      </h3>
                      <p className="leading-loose text-md ">Reference NO: {item.reference_number}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ClearButton  isChecked={showPersonalVerification} onToggle={handleClearButtonPersonal} />
            </div>

            <div className="bg-green-200 p-4 rounded-md shadow-md">
              <h1 className="leading-loose text-md font-bold text-3xl text-center">Cargo Documents</h1>
              <div className="">
                {cargoDocuments.map((item, index) => (
                  <div key={index} className=" ">
                    <div className="">
                      <h3 className="font-semibold text-nova-amber-600 leading-10 text-2xl">
                        {item.document_type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (char) =>
                          char.toUpperCase()
                        )}
                      </h3>
                      <p className="leading-loose text-md ">Reference NO: {item.reference_number}</p>
                      <p className="leading-loose text-md ">Type of Cargo: {item.cargo}</p>
                      <p className="leading-loose text-md ">Cargo Tonnes: {item.cargo_tones}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ClearButton  isChecked={showCargoVerification} onToggle={handleClearButtonCargo} />
            </div>

            <div className="bg-yellow-100 p-4 rounded-md shadow-md">
              <h1 className="leading-loose text-md font-semibold text-3xl ">Truck Documents</h1>
              <div className="">
                {truckDocuments.map((item, index) => (
                  <div key={index} className="">
                    <div className="">
                      <h3 className="font-semibold text-nova-amber-600  text-2xl">
                        {item.document_type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (char) =>
                          char.toUpperCase()
                        )}
                      </h3>
                      <p className="leading-loose text-md ">Reference NO: {item.reference_number}</p>
                      
                      
                    </div>
                  </div>
                ))}
              </div>
              <ClearButton  isChecked={showTruckVerification} onToggle={handleClearButtonToggle} />
            </div>
          </div>
          <div className="text-center mt-8 ml-36 mb-16">
            <button
              className="bg-white text-nova-amber-600 border border-nova-amber-600 py-4 px-24 rounded-lg mx-4" onClick={handleCancelAction}
            >
              Cancel
            </button>
            <button
              className="bg-nova-amber-600 text-white py-4 px-24 rounded-lg mx-4"
              onClick={handleVerificationClear}
            >
              cleared
            </button>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;



