// import Image from 'next/image'
"use client";
import axios from "axios";
import FileUpload from "../components/upload";
import FileListPage from "@/components/listfiles";
import { nanoid } from "nanoid";
import { customAlphabet } from "nanoid";
import { model, set } from "mongoose";
import { useState } from "react";
import { useEffect } from "react";
import AfterSender from "@/components/afterSender";
export default function Home() {


  const[Uid,setUid] = useState("");
  const [UidBrq,setUidBrq] = useState("");
  const [sender,setSender] = useState(false);


  const handleUpload = async (files: File[]) => {
    // Upload files to the server
    // var numberOfFileSize = 0;
    // files.forEach((file) => {
    //   numberOfFileSize += file.size;
    // });
    // // console.log(numberOfFiles);
    // console.log(numberOfFileSize/1024/1024/1024);
    const nanoid2 = customAlphabet("abcdefGHIJKLmNOPQRSTUVwxyz", 26);
    const nanoid3 = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 20);
    const __XPDUiD = nanoid2(5);
    const __MqwidBrq = nanoid3(20);
    // console.log(__idBrq,"      ",__id)
    setUid(__XPDUiD);
    setUidBrq(__MqwidBrq);


    console.log(files);

    const secureSender = {
      files: files,
      sender: "anhole",
      Uid: __XPDUiD,
      UidBrq: __MqwidBrq,
    };
    
    console.log(secureSender);
    const formData = new FormData();
    
    files.forEach((file) => {
      formData.append("files", file);
      formData.append("sender", "anhole");
      formData.append("Uid", __XPDUiD);
      formData.append("UidBrq", __MqwidBrq);
    });
    console.log(formData)

    setSender(true);
    await axios.post("/api/uploads", formData);
  };
  return (
    <div className="container ">
      <h1 className="text-2xl font-bold mb-4">Upload Files</h1>
      <FileUpload onUpload={handleUpload} />
      <FileListPage />
      {sender ? (
        <AfterSender Uid={Uid} UidBrq={UidBrq}  />
      ) : (
        <></>
      )
        }
    </div>
  );
}
