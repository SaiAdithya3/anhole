import { DropzoneOptions, useDropzone } from "react-dropzone";
import React, { useState } from "react";

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

  return (
    <div {...getRootProps()} className="border-2 border-dashed border-gray-400 p-20 w-[30rem] h-[25rem] text-center flex items-center justify-center rounded-md">
      <div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Upload
          </button>
        </div>
        <input {...getInputProps()} />
        <p className="text-center">
          Drag and drop files here, or click to select files
        </p>
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
  );
};

export default FileUpload;