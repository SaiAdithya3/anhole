// import { promisify } from "util";
// import { pipeline as pipelineCallback, Readable } from "stream";
// import { NextApiRequest } from "next";
// import { connectToDb } from "@/lib/mongo";
// import { NextResponse } from "next/server";
// import JSZip from "jszip";
// import { Content } from "next/font/google";
// import { data } from "autoprefixer";

// const pipeline = promisify(pipelineCallback);

// async function streamToBuffer(stream: Readable): Promise<Buffer> {
//   const chunks: Uint8Array[] = [];
//   return new Promise<Buffer>((resolve, reject) => {
//     stream.on("data", (chunk) => chunks.push(chunk));
//     stream.on("end", () => resolve(Buffer.concat(chunks)));
//     stream.on("error", (error) => reject(error));
//   });
// }

// export async function GET(request: NextApiRequest, { params }: any,res:any) {
//   const { bucket } = await connectToDb();

//   const uid = params.FileId;
//   console.log(uid);
//   const string_slice = uid.slice(0, 5);
//   console.log(string_slice);
//   // const fileObjectId = new ObjectId(fileId as string);

//   // Fetch the known files based on metadata
//   const metadataField = "Uid";
//   const metadataValue = string_slice;
//   const metadataQuery = { ["metadata." + metadataField]: metadataValue };
//   const cursor = bucket.find(metadataQuery);

//   const knownFiles = await cursor.toArray();
//   console.log(knownFiles.length);
//   if (!knownFiles.length) {
//     return new NextResponse(null, { status: 404, statusText: "Not found" });
//   }

//   const zip = new JSZip();
//   if (knownFiles.length > 1) {
//     // Add each known file to the ZIP archive
//     knownFiles.forEach((file) => {
//       const stream = bucket.openDownloadStreamByName(
//         file.filename
//       ) as unknown as Readable;
//       zip.file(file.filename, stream); // Add the file to the ZIP archive
//     });

//     // Generate the ZIP file as a buffer
//     const zipBuffer = await zip.generateAsync({
//       type: "uint8array",
//       streamFiles: true,
//     });

//     // Set appropriate headers for the ZIP file
//     const headers = {
//       "Content-Type": "application/zip",
//       "Content-Disposition": `attachment; filename="download.zip"`,
//     };
    

//     return new NextResponse(Buffer.from(zipBuffer), { headers });
//   } else {
//     console.log( knownFiles[0].contentType);
//     const Contenttype = knownFiles[0].contentType;
//     const name = knownFiles[0].filename;


//     const stream = bucket.openDownloadStreamByName(
//       knownFiles[0].filename 
//     ) as unknown as ReadableStream;

//     // stream.pipe(res);

//     // const buffer = await streamToBuffer(stream);
//     const headers = {
//       // "Content-Type": "application/zip",
//       // "Content-Disposition": `attachment; filename="download.zip"`,
//       "Content-Type": `${Contenttype}`,
//       // "Content-Type": `${Contenttype}`,
//       // "Content-Disposition": `attachment; filename="${knownFiles[0].filename}"`,
//       // "Content-Length": knownFiles[0].length,
//     };
//     return new NextResponse(stream, { headers });
//   }
// }
