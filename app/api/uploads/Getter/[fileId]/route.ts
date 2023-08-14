import { connectToDb } from "@/lib/mongo";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest, { params }: any) {
  const { bucket } = await connectToDb();

  const uid = params.fileId;
  console.log(uid);
  const string_slice = uid.slice(0, 5);
  console.log(string_slice);

  // Fetch the known files based on metadata
  const metadataField = "Uid";
  const metadataValue = string_slice;
  const metadataQuery = { ["metadata." + metadataField]: metadataValue };
  const cursor = bucket.find(metadataQuery);
  const knownFiles = await cursor.toArray();
  console.log(knownFiles.length);

  // Create an array to hold file metadata
  const fileDataArray: any[] = [];

  knownFiles.forEach((file) => {
    // Extract the relevant fields from the metadata and push into the array
    fileDataArray.push({
      // fileName: file.filename,
      // uploadDate: file.uploadDate,
      size: file.metadata?.size,
      type: file.metadata?.type,
      originalName: file.metadata?.originalName,
      // Add other relevant fields as needed
    });
  });

  // Convert the fileDataArray to JSON
  const fileDataJson = JSON.stringify(fileDataArray);

  // Return the JSON response
  return new NextResponse(fileDataJson, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
