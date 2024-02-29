import React, { useState, useRef } from "react";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [QR, setQR] = useState("");
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const qrCodeRef = useRef(null);

  const createQr = () => {
    if (!inputValue) {
      return alert("No Link Found");
    }

    const qrCodeUrl = `http://api.qrserver.com/v1/create-qr-code/?data=${inputValue}&size=[200]x[200]`;
    setQR(qrCodeUrl);
    setShowDownloadButton(true);
  };

  const downloadQRCode = () => {
    const canvas = qrCodeRef.current;
    const context = canvas.getContext("2d");
  
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = QR;
  
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
  
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "QRCode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };
  

  const clearInput = () => {
    setInputValue("");
    setQR("");
    setShowDownloadButton(false);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 lg:p-8">
        <div className="flex justify-center">
          <div className="input flex justify-center mt-5 mb-7 px-5 lg:px-0 space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Paste the Link here"
              className="shadow-md text-white bg-[#2f3542] placeholder-gray-400 
              rounded-l-lg px-2 py-2 w-full lg:w-[30em] outline-none border-2 border-gray-600 
              focus:ring focus:border-blue-300 transition-all duration-300"
            />
    
            <button
              onClick={createQr}
              className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-4 rounded-r-lg text-white shadow-md border-b-2 border-r-2 border-t-2 border-l-2 border-blue-800 hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
            >
              Create
            </button>
          </div>
        </div>

        {QR && (
          <div className="qr-container">
            <h2 className="qr-title text-center text-2xl text-white font-semibold mb-5">
              Here is your QR Code
            </h2>
            <canvas
              ref={qrCodeRef}
              className="qr-image"
              width={200}
              height={200}
              style={{ display: "none" }}
            ></canvas>
            <a className="flex justify-center">
              <img
                className="qr-image w-64 h-64"
                src={QR}
                alt="QR code"
                crossOrigin="anonymous"
              />
            </a>
            {showDownloadButton && (
              <div className="mt-5 text-center">
                <button
                  onClick={downloadQRCode}
                  className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 px-3 py-1 text-white shadow-md border-b-2 border-r-2 border-t-2 border-l-2 border-green-800 hover:from-green-700 hover:to-green-800 transition-all duration-300 mr-2"
                >
                  Download
                </button>
                <button
                  onClick={clearInput}
                  className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 px-3 py-1 text-white shadow-md border-b-2 border-r-2 border-t-2 border-l-2 border-red-800 hover:from-red-700 hover:to-red-800 transition-all duration-300"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
