"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; // Make sure to export your firebase setup
import { collection, getDocs } from "firebase/firestore";

interface FileData {
  uuid: string;
  displayName: string;
  cloudinaryUrl: string;
  publicId: string;
}

const FileList = () => {
  const [files, setFiles] = useState<FileData[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "files"));
        const filesArray: FileData[] = [];
        querySnapshot.forEach((doc) => {
          filesArray.push(doc.data() as FileData);
        });
        setFiles(filesArray);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  const handleDownload = (url: string, displayName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = displayName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {files.map((file) => (
          <div key={file.uuid} className="flex items-center justify-between">
            <span>{file.displayName}</span>
            <button
              onClick={() =>
                handleDownload(file.cloudinaryUrl, file.displayName)
              }
              className="text-white bg-blue-500 hover:bg-blue-700 p-2 rounded"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;
