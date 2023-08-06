// import Image from 'next/image'
"use client"
import FileUpload from "../components/upload";
export default function Home() {
  const handleUpload = (files: File[]) => {
    // Upload files to the server
    var numberOfFileSize = 0;
    files.forEach((file) => {
      numberOfFileSize += file.size;
    });
    // console.log(numberOfFiles);
    console.log(numberOfFileSize/1024/1024/1024);
    console.log(files);
  };
  return (
    <div className="container ">
    <h1 className="text-2xl font-bold mb-4">Upload Files</h1>
    <FileUpload onUpload={handleUpload} />
  </div>
  )
}