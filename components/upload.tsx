import { DropzoneOptions, useDropzone } from "react-dropzone";
import React, { useState } from "react";
import axios from "axios";
import { HiOutlineUpload } from "react-icons/hi";
import { PiFilesLight } from "react-icons/pi";
import { AxiosRequestConfig } from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import SimpleProgressBar from "@/components/progressbar";

interface Props {
  onUpload: (files: File[]) => void;
}

interface FilePreview {
  file: File;
  preview: string;
  fileType: "image" | "video" | "pdf";
}


const FileUpload: React.FC<Props> = ({ onUpload }) => {
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
  // const [remaining, setRemaining] = useState(0);
  // const [progress, setProgress] = useState(0);

  const onDrop = (acceptedFiles: File[]) => {
    const promises = acceptedFiles.map((file) => {
      return new Promise<FilePreview>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({ file, preview: reader.result as string, fileType: getFileType(file.type) });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((filePreviews) => {
      setFilePreviews(filePreviews);
      onUpload(acceptedFiles);
    });
  };

  const getFileType = (fileType: string): "image" | "video" | "pdf" => {
    if (fileType.startsWith("image")) {
      return "image";
    } else if (fileType.startsWith("video")) {
      return "video";
    } else if (fileType === "application/pdf") {
      return "pdf";
    } else {
      return "image"; // Default to image preview for other types
    }
  };

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  const fileId = "64d8c60b3e0ad2975731b6af";
  const getfiles = async () => {
    // const files =await axios.get(`/api/uploads/${fileId}`);
    // console.log(files);
  }

  const showToastMessage = () => {
    toast.success('Success Notification !', {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

  return (
    <>
    <div {...getRootProps()} className="border-2 shadow-2xl shadow-indigo-900 border-dashed hover:border-double hover:border-4 border-indigo-300 p-20 sm:w-[30rem] sm:h-[30rem] text-center flex items-center justify-center rounded-full w-[23rem] h-[23rem] mx-auto">
      <div className="">
        <PiFilesLight className="text-white text-8xl m-auto mb-2 stroke-1 opacity-50"/>
        <p className="text-center text-white text-md mb-10">
          <strong>Drag and drop files here</strong>, or click to select files
        </p>
        <div>
          <button className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-lg">
          <HiOutlineUpload onClick={showToastMessage} className="inline mr-2 text-xl"/>Upload
          </button>
          <ToastContainer />
        </div>
        <input {...getInputProps()} />
        <div className="mt-4">
          {filePreviews.map(({ file, preview, fileType }) => (
            <div key={file.name} className="mt-2">
              {fileType === "image" && (
                <img src={preview} alt={file.name} className="max-h-20 mx-auto" />
              )}
              {fileType === "video" && (
                <video controls className="max-h-20 mx-auto">
                  <source src={preview} type={file.type} />
                  Your browser does not support the video tag.
                </video>
              )}
              {fileType === "pdf" && (
                <iframe src={preview} title={file.name} className="max-h-20 mx-auto" />
                )}
              <p className="text-sm text-gray-600">{file.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div>
      {/* <button  onClick={getfiles} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Upload
      </button> */}
    </div>
          </>
    
  );
};

export default FileUpload;