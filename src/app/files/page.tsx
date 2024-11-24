import FileList from "@/components/filelist";

export default function FilesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Uploaded Files</h1>
      <FileList />
    </div>
  );
}
