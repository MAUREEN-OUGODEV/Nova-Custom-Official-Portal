'use client';
import Greeting from '@/app/Component/Greetings';
import React, { useState } from 'react';

function Search({ drivers, onSearch } : {drivers?:any; onSearch?:any}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePage, setActivePage] = useState('');

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };


  const handlePageClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-4 mt-8">
 

  
   
</div>

<div className="">

 
 <div className="flex ml-96">
            <div>
            <h1 className="font-bold text-center  mt-2 ml-32 text-5xl">
              Custom <span className='text-amber-600'>Official</span> Portal
             </h1>
            </div>
            <div className='text-center ml-72 mt-8'>
             <img src="/images/custom.jpeg"
              alt="Profile"
               className='lg:w-18 mx-auto mb-4 sm:w-10 sm:mb-2'/>
               <Greeting />
               <p className='text-lg text-sm text-bold'>Brian Amoti</p>
            </div>
      
    </div>
  
  <label className="relative">
    <span className="sr-only">Search</span>
    <span className="absolute inset-y-0 left-0 flex items-center pl-4">
      <svg className="h-4 w-4 fill-slate-300" viewBox="0 0 10 10"></svg>
    </span>
    <input
      className="placeholder-italic placeholder-text-slate-400 bg-white  mt-4 w-1/2  border-2 ml-96  pr-8 border-amber-600 rounded-full py-3 px-3 shadow-lg focus:outline-none focus:border-amber-600 focus:ring-sky-600 focus:ring-1 sm:text-sm"
      placeholder="  Search for here..."
      type="text"
      name="search"
      value={searchQuery}
      onChange={handleSearchInputChange}
    />
  </label>
</div>

    </div>
  );
}

export default Search;
