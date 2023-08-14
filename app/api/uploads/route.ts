import {connectToDb} from "@/lib/mongo";
import { NextResponse } from "next/server";
// import {Readable} from "stream";
import { NextApiRequest, NextApiResponse } from 'next';
import Upload from "@/models/upload";
import JSZip from "jszip";
import { pipeline as pipelineCallback, Readable } from "stream";
import { promisify } from "util";



export async function POST(req: Request){
    const{bucket}= await connectToDb();

    const data = await req.formData();
    // console.log(data)
  var sender, Uid, UidBrq;
    for (const entry of Array.from(data.entries())){
        const [key, value] = entry;
        if (key === "sender") {
          sender = value;
      } else if (key === "Uid") {
          Uid = value;
      } else if (key === "UidBrq") {
          UidBrq = value;
      }
        const isFile = typeof value == "object";
        // console.log(isFile)

        if(isFile){
            const blob = value as Blob;

            const filename = blob.name;
            const fileSize = blob.size;
            const fileType = blob.type;

            // const existing = await fileExists(filename);
            // if (existing) {
            //   // If file already exists, let's skip it.
            //   // If you want a different behavior such as override, modify this part.
            //   continue;
            // }

             //conver the blob to stream
            //  console.log(filename)
      const buffer = Buffer.from(await blob.arrayBuffer());
      const stream = Readable.from(buffer);

      const uploadStream = bucket.openUploadStream(filename, {
        // make sure to add content type so that it will be easier to set later.
        contentType: blob.type,
        metadata: {
          sender: sender,
          Uid: Uid,
          UidBrq: UidBrq,
          originalName: filename,
          size: fileSize,
          type: fileType,
        }, //add your metadata here if any
      });
      // console.log(uploadStream)
      // pipe the readable stream to a writeable stream to save it to the database
      await stream.pipe(uploadStream);
        }
    }
    // return the response after all the entries have been processed.
  return NextResponse.json({ success: true });
}







// pages/api/uploads/[fileId].ts

