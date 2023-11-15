import React from 'react';
import { docVerification } from '@/app/utilities/utils';

function ToggleButton({ isChecked, onToggle }) {
    return (
      <button
        onClick={onToggle}
        className={`${
          isChecked
            ? 'bg-amber-600 text-white'
            : 'bg-gray-300 text-gray-700'
        } px-4  mt-4 mb-4 py-2 text-xs rounded-md cursor-pointer`}

      >
        {isChecked ? 'Document Verified' : 'Verify Document'}
      </button>
    );
  }

export default ToggleButton;