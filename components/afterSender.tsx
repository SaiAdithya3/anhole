import React from 'react';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsFillClipboardCheckFill, BsClipboard } from "react-icons/bs";
import { BiQrScan } from "react-icons/bi";
import QRCode from "react-qr-code";
import QRModal from '@/components/QRCode';
import { VscOpenPreview } from "react-icons/vsc"

interface AfterSenderProps {
  Uid: string;
  UidBrq: string;
}

const AfterSender: React.FC<AfterSenderProps> = ({ Uid, UidBrq }) => {
  const [isCopied, setIsCopied] = useState(false);

  const [selectedOption, setSelectedOption] = useState('');
  const [generatedQR, setGeneratedQR] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const base = "http://localhost:3000/";
  const links = base + Uid + "-" + UidBrq;
  
  const openModal = () => {
    setModalOpen(true);
    setGeneratedQR(links);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // const router = useRouter();


  const copyLink = () => {
    navigator.clipboard.writeText(links).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch((error) => {
      console.error('Failed to copy link:', error);
    });
  };

  return (
    <div className='border-2 flex flex-col shadow-2xl shadow-indigo-900 border-indigo-300 p-20 sm:w-[30rem] sm:h-[30rem] text-center flex items-center justify-center rounded-full w-[23rem] h-[23rem]'>
      <h1 className='text-2xl font-extrabold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>Your file is ready to share!</h1>
      {/* <p>afterSender with Uid: {Uid} and UidBrq: {UidBrq}</p> */}
      <p className='text-white text-sm mb-5'>Copy the link to share your file</p>
      <div className="flex items-center justify-center">

        <input type="text" value={links} className='w-full h-10 px-2 text-sm focus:outline-none focus:ring focus:border-indigo-300 rounded-md ' />
        <button onClick={copyLink} className="bg-slate-300 ml-1 h-10 ml-1 hover:bg-slate-600 text-black hover:text-white text-xs font-bold py-2 px-4 rounded-lg">
          {isCopied ? <> <BsFillClipboardCheckFill className="text-xl" />  </> : <>  <BsClipboard className="text-xl" /> </>}
        </button>
      </div>
      {/* <p className="text-white">http://localhost:3000/{Uid}-{UidBrq}</p> */}

<div className="flex w-full">

      <button className="bg-stone-300 w-full hover:bg-gray-200 text-black sm:py-2 sm:px-4 py-2 rounded-lg mt-6 text-[10px] sm:text-sm mb-3" onClick={openModal}>
          <BiQrScan className="inline mr-2 text-sm sm:text-xl"/>Show QR 
      </button>
      <button className="bg-stone-300 w-full hover:bg-gray-200 text-black sm:py-2 sm:px-4 py-2 ml-1 rounded-lg mt-6 text-[10px] sm:text-sm mb-3" onClick={openModal}>
          <VscOpenPreview className="inline mr-2 text-sm sm:text-xl"/>Preview Files
      </button>
</div>
      <QRModal isOpen={modalOpen} onClose={closeModal} text={generatedQR} />

<div className="flex items-center justify-center sm:mt-10  ">

      <p className="text-white text-[9px] sm:text-sm ">Your file will be deleted in</p>
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="sm:px-2 sm:py-1 border rounded-md text-[9px] sm:text-xs h-full ml-2 font-bold"
        >
        <option value="">Select...</option>
        <option value="60">60 minutes</option>
        <option value="120">2 hours</option>
        <option value="1440">1 day</option>
      </select>
        </div>

    </div>
  );
};

export default AfterSender;
