// pages/FileListPage.tsx
import { useState, useEffect } from 'react';
import axios from "axios";

interface FileMetadata {
  _id: string;
  filename: string;
  contentType: string;
  uploadDate: string;
}

const FileId = "SNfyG";
const FileListPage: React.FC = () => {
  const [files, setFiles] = useState<FileMetadata[]>([]);


    const getfiles = async () => {
      const files =await axios.get(`/api/${FileId}`);
      console.log(files);
      // setFiles(files.headers);
    }

  // }, []);

//   const handleDelete = async (fileId: string) => {
//     if (confirm('Are you sure you want to delete this file?')) {
//       try {
//         const response = await fetch(`/api/uploads/route/${fileId}`, {
//           method: 'DELETE',
//         });

//         if (response.ok) {
//           // File deletion successful, update the file list
//           setFiles(prevFiles => prevFiles.filter(file => file._id !== fileId));
//         } else {
//           const errorMessage = await response.text();
//           console.error('Error deleting file:', errorMessage);
//         }
//       } catch (error) {
//         console.error('Error deleting file:', error);
//       }
//     }
//   };

  return (
    <div>
      
      <button onClick={getfiles}>Get Files</button>
      {/* <h1 >Uploaded Files</h1>
      <ul>
        {/* {files.map(file => (
          <li key={file._id}>
            <p>Filename: {file.filename}</p>
            <p>Content Type: {file.contentType}</p>
            <p>Upload Date: {file.uploadDate}</p> */}
            <a href={`/api/uploads/${FileId}`} download>
              Download
            </a>
            {/* <button onClick={() => handleDelete(file._id)}>Delete</button> */}
          {/* </li>
        ))} */}
      {/* </ul>  */}
    </div>
  );
};

export default FileListPage;
