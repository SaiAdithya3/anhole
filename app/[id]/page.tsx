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
import { useState, useEffect } from 'react'


const pkage = ({ params }: any) => {
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

  return (
    <div>
      <h1>Page {params.id}</h1>
      
      <a href={`/api/uploads/${params.id}`} download>
              Download File
            </a>
            
               
      {
        data.map((item:any,index:number)=>(
          <div key={index}>
            <h1>{item.originalName}</h1>
            <h1>{item.size/1024}</h1>
            <h1>{item.type}</h1>
          </div>
        ))
      }
            
            
          
      <video controls>
          <source src={`/api/uploads/${params.id}`} type={`video/mp4`} />
          Your browser does not support the video tag.
        </video>
    </div>
  );
};

export default pkage;


