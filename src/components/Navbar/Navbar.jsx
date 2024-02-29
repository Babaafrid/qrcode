import React from 'react';

function Navbar() {
  return (
    <div className='main bg-[#1f2937] py-4 shadow-md'>
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <img className='w-14 h-14 rounded-full' src="https://i.pinimg.com/736x/11/f7/83/11f78374741b89e4dea99e0b6356ee3c.jpg" alt="Logo" />
          <span className='text-xl text-white font-bold  mx-auto'>QR Code Generator</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
