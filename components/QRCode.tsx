import React from 'react';
import QRCode from "react-qr-code";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
}

const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, text }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay p-3 flex items-center justify-center top-0 left-0 fixed w-screen h-screen bg-black bg-opacity-70">
      <div className="modal bg-slate-400 p-10 rounded-xl shadow shadow-indigo-900">
        <h1 className='text-white text-2xl font-bold mb-5'>Scan to download</h1>
        <button className="modal-close text-white mb-2 bg-black px-5 py-1 rounded-lg text-md" onClick={onClose}>
          Close
        </button>
        <QRCode value={text} />
      </div>
    </div>
  );
};

export default QRModal;
