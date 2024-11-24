import FileUploader from "@/components/uploadfiles";

export default function UploadPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upload a File</h1>
      <FileUploader />
    </div>
  );
}
