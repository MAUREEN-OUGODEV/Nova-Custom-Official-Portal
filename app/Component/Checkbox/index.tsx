import React, { useState } from 'react';

function ToggleButton({ isChecked, onToggle, onCancel }) {
  const [isCancelled, setIsCancelled] = useState(false);

  const handleCancel = () => {
    setIsCancelled(true);
    onCancel();
  };

  return (
    <div className="flex ml-16 gap-8 space-x-4">
      <button
        onClick={onToggle}
        className={`${
          isChecked ? 'bg-amber-600 text-white' : 'bg-gray-300 text-gray-700'
        } px-4 mt-4 mb-4 py-2 text-xs rounded-md cursor-pointer`}
      >
        {isChecked ? 'Document Verified' : 'Verify Document'}
      </button>
      <button
        onClick={handleCancel}
        className={`${
          isCancelled ? 'bg-nova-amber-600 text-white' : 'bg-red-500 text-white'
        } px-4 mt-4 mb-4 py-2 text-xs rounded-md cursor-pointer`}
      >
        {isCancelled ? 'Cancelled' : 'Cancel Document'}
      </button>
    </div>
  );
}

export default ToggleButton;
