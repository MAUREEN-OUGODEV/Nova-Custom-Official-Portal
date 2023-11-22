import React from 'react';

const DocumentApproval = () => {
  return (
    <div>
         <div className="grid grid-cols- gap-4 mt-2">
        <div className="col-span-1">
          <img src="/images/Logo.png" alt="" className="w-12 h-12 ml-48 " />
        </div>
        <div className="">
        <h1 className="font-bold text-center mb-8 text-4xl">Custom <span className='text-amber-600'>Official</span> Portal</h1>
                 
        </div>
      </div>
      <div className="ml-96 mt-24 items-center justify-center">
      <div className="">
      <img src="/images/tick.jpg" alt="" className="w-96 h-96 ml-96 " />
        <h1 className="text-3xl  text-justify font-bold text-green-700 mb-4 ml-96">Approved!</h1>
        <p className="text-green-800 text-green-800 ml-24 text-2xl">
           Documents have been successfully approved and The Driver is cleared. 😊
        </p>
      </div>
    </div>
    </div>
    
  );
};

export default DocumentApproval;