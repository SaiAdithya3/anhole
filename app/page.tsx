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
import { BiLockAlt } from "react-icons/bi";
import AfterSender from "@/components/afterSender";
import { PiFlowArrowThin } from "react-icons/pi"
export default function Home() {


  const [Uid, setUid] = useState("");
  const [UidBrq, setUidBrq] = useState("");
  const [sender, setSender] = useState(false);


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
    <div className="container flex items-center justify-around">
      <div className="main flex sm:flex-row flex-col-reverse">
        <div className="left">

          {/* <h1 className="text-2xl font-bold mb-4">Upload Files</h1> */}
          {/* <FileListPage /> */}
          {sender ? (
            <AfterSender Uid={Uid} UidBrq={UidBrq} />
          ) : (
            <>
              <FileUpload onUpload={handleUpload} />
              {/* < PiFlowArrowThin className="text-white text-5xl" /> */}
            </>
          )
        }
        </div>


        <div className="right flex flex-col items-center justify-center px-12 py-10">
        {/* <div className="arrow bg-no-repeat w-full h-1/4 ml-0 origin-center"></div> */}
          <div className="lock shadow-lg shadow-gray-800 text-white border-gray-50 border border-slate-300 hover:border-indigo-300 rounded-full px-4 py-2 ">
            <span><BiLockAlt className="inline mr-1" />We care about your <strong>Privacy</strong></span>
          </div>
          <h1 className="text-white sm:text-[60px] text-[45px] font-bold py-5 flex flex-col items-center sm:flex-row sm:items-center">Send Files <span className="pl-3 font-extrabold text-transparent sm:text-[60px] text-[45px] bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Securely.</span></h1>
          <p className="text-white">Anhole lets you share files with a link which automatically expires.</p>
        </div>

      </div>
    </div>
  );
}
