// import { promisify } from "util";
// import { pipeline as pipelineCallback, Readable } from "stream";
// import { NextApiRequest } from "next";
// import { connectToDb } from "@/lib/mongo";
// import { NextResponse } from "next/server";
// import JSZip from "jszip";


// const pipeline = promisify(pipelineCallback);

// async function streamToBuffer(stream: Readable): Promise<Buffer> {
//   const chunks: Uint8Array[] = [];
//   return new Promise<Buffer>((resolve, reject) => {
//     stream.on("data", (chunk) => chunks.push(chunk));
//     stream.on("end", () => resolve(Buffer.concat(chunks)));
//     stream.on("error", (error) => reject(error));
//   });
// }

// export async function GET(request: NextApiRequest, { params }: any) {
//   const { bucket } = await connectToDb();
//   const uid = params.uid;
//   const string_slice= uid.slice(0, 5);
//   console.log(string_slice)

//   // Fetch the known files based on metadata
//   const metadataField = "Uid";
//   const metadataValue = string_slice;
//   const metadataQuery = { ["metadata." + metadataField]: metadataValue };
//   const cursor = bucket.find(metadataQuery);

//   const knownFiles = await cursor.toArray();
//   console.log(knownFiles.length)
//   if (!knownFiles.length) {
//     return new NextResponse(null, { status: 404, statusText: "Not found" });
//   }

//   const zip = new JSZip();
//   if(knownFiles.length > 1) {
//   // Add each known file to the ZIP archive
//   knownFiles.forEach((file) => {
//     const stream = bucket.openDownloadStreamByName(file.filename) as unknown as Readable;
//     zip.file(file.filename, stream); // Add the file to the ZIP archive
//   });

//   // Generate the ZIP file as a buffer
//   const zipBuffer = await zip.generateAsync({ type: "uint8array", streamFiles: true });

//   // Set appropriate headers for the ZIP file
//   const headers = {
//     "Content-Type": "application/zip",
//     "Content-Disposition": `attachment; filename="download.zip"`,
//   };

//   return new NextResponse(Buffer.from(zipBuffer), { headers });
// } else {

//     const stream = bucket.openDownloadStreamByName(knownFiles[0].filename) as unknown as ReadableStream;
//     // const buffer = await streamToBuffer(stream);
//     const headers = {
//         // "Content-Type": "application/zip",
//         // "Content-Disposition": `attachment; filename="download.zip"`,
//       };
//     return new NextResponse(stream, { headers });
// }
// }
// pages/[uid]/page.tsx

"use client"
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { LiaDownloadSolid } from 'react-icons/lia';
import { BiQrScan } from "react-icons/bi";
import QRModal from '@/components/QRCode';
import { BsFillClipboardCheckFill, BsClipboard } from "react-icons/bs";


const pkage = ({ params }: any) => {
  const [isCopied, setIsCopied] = useState(false);
  const [generatedQR, setGeneratedQR] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  function kbToMb(kb: number): number {
    return kb / 1024;
  }
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(`/api/uploads/Getter/${params.id}`).then((res) => {
      console.log(res.data);
      setData(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])


  const base = "http://localhost:3000/";
  const links = base + params.id;

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
    <div className='m-auto border-2 mt-50 sm:border-3 flex flex-col shadow-2xl shadow-indigo-900 border-indigo-300 p-20 sm:w-[35rem] sm:h-[35rem] w-[23rem] h-[23rem] text-center flex items-center justify-center rounded-full'>
      {/* <h1>Page {params.id}</h1> */}
      <h1 className='text-[1.2rem] sm:text-[2.2rem] font-extrabold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>Yo, you've got some files!</h1>

      <a href={`/api/uploads/${params.id}`} download className='text-black bg-gradient-to-r from-slate-50 to-gray-200 m-auto sm:px-4 sm:py-6 px-2 py-3 my-2 rounded-full shadow-2xl shadow-indigo-300 border-indigo-700 border-2 hover:shadow-white hover:-translate-y-4 ease-in duration-300'>
        <LiaDownloadSolid className="text-lg sm:text-4xl m-auto flex items-center" />
        <span className='text-sm sm:text-xs font-bold'>Download Files</span>
      </a>



          <div className='mb-3'>
            <table className="table-auto text-white rounded-md">
              <thead className='border bg-[#252525] border-white text-sm '>
                <tr className=''>
                  <th className='border bg-gray border-white px-3 '>File</th>
                  <th className='border border-white px-3'>Size</th>
                  <th className='border border-white px-3'>Type</th>
                </tr>
              </thead>
              <tbody className='border border-slate-300'>
      {
        data.map((item: any, index: number) => (
                <tr key={index}>
                  <td className='border border-slate-300 px-4 text-xs'>{item.originalName}</td>
                  <td className='border border-slate-300 px-3 text-xs' >{item.size / 1024} kb</td>
                  <td className='border border-slate-300 px-3 text-xs'>{item.type}</td>
                </tr>
              ))
            }
              </tbody>
            </table>
          </div>


      <div className="flex">

        <button className="bg-stone-300 hover:bg-gray-200 text-black py-2 px-4 rounded-lg text-[10px] sm:text-sm mb-3" onClick={openModal}>
          <BiQrScan className="inline mr-2 text-sm sm:text-xl" />Show QR 
        </button>
        <button onClick={copyLink} className="hover:bg-stone-300 bg-gray-200 text-black py-2 px-4 rounded-lg text-[10px] sm:text-sm mb-3 ml-1">
          {isCopied ? <> <BsFillClipboardCheckFill className="text-sm sm:text-xl inline" /> Copied!  </> : <>  <BsClipboard className="inline text-sm sm:text-xl" /> Copy Link </>}
        </button>
        <QRModal isOpen={modalOpen} onClose={closeModal} text={generatedQR} />
      </div>  


      {/* <video controls>
          <source src={`/api/uploads/${params.id}`} type={`video/mp4`} />
          Your browser does not support the video tag.
        </video> */}
      {/* <img src={`/api/uploads/${params.id}`} /> */}
    </div>
  );
};

export default pkage;


