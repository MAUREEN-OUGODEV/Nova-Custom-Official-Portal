import React, { useState } from 'react';

function ClearButton({ isChecked, onToggle }) {
 
  return (
    <div className="flex ml-16 gap-8 space-x-4">
      <button
        onClick={onToggle}
        className={`${
          isChecked ? 'bg-amber-600 text-white' : 'bg-gray-300 text-gray-700'
        } px-4 mt-4 mb-4 py-2 text-xs rounded-md cursor-pointer`}
      >
        {isChecked ? 'Cleared' : 'Clear Driver'}
      </button>
    </div>
  );
}

export default ClearButton;
